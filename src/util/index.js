export const el = (tagName) => {
    return document.createElement(tagName);
}

export const getRemainingTime = (messageVO) => {
    return Number(messageVO.time) - (new Date().getTime() / 1000 - messageVO.createdDate.getTime() / 1000);
};

export const getRelocationIndex = ({ messageVO, messageList }) => {
    const sortedList = new Array(...messageList.values()).sort((a, b) => {
        return getRemainingTime(b) - getRemainingTime(a);
    });

    let index = sortedList.findIndex((sortedMessage) => sortedMessage.sn === messageVO.sn);
    return index;
};