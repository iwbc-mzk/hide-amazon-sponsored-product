import { MESSAGE_TYPE } from './const';

// ページ更新時
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        const message = { type: MESSAGE_TYPE.hideAdProduct };
        chrome.tabs
            .sendMessage(tab.id ?? 0, message)
            .catch((err) => console.log(err));
        // amazon以外では「Error: Could not establish connection. Receiving end does not exist.」になる。
    }
});
