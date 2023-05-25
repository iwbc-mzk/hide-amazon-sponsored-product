import { MESSAGE_TYPE } from './const';

const productInfoListener = (
    msg: { type: string },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
): void => {
    if (msg.type !== MESSAGE_TYPE.hideAdProduct) {
        return;
    }

    // chrome.tabs.onUpdatedで送られてきたメッセージの到着直後では
    // 描画が完了していないことがあるためインターバルで完了を待つ
    var retry = 0;
    var interval_id: NodeJS.Timer;
    const max_retry = 5;
    const hideAdProduct = () => {
        retry++;

        if (retry >= max_retry) {
            clearInterval(interval_id);
        }

        const adElements = document.getElementsByClassName('AdHolder');
        if (adElements.length > 0) {
            clearInterval(interval_id);
            for (
                var i = 0, len = adElements.length | 0;
                i < len;
                i = (i + 1) | 0
            ) {
                (adElements[i] as HTMLElement).style.display = 'none';
            }
        }
    };
    interval_id = setInterval(hideAdProduct, 1000);

    sendResponse();
};

chrome.runtime.onMessage.addListener(productInfoListener);
