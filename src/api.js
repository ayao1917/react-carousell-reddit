function getTopics() {
  return new Promise((resolve, reject) => {
    const result = this.loadTopicFromMemory();
    resolve({
      success: true,
      data: result,
    });
  });
}

function setTopic(data) {
  return new Promise((resolve, reject) => {
    let topicList = this.loadTopicFromMemory();
    const foundIndex = topicList.findIndex(x => x.id === data.id);

    if (foundIndex !== -1) {
      topicList[foundIndex] = data;
    } else {
      const maxId = topicList.length < 1 ? 0 : topicList.reduce(function(prev, current) {
        return (prev.id > current.id) ? prev : current
      }).id;
      data.id = maxId + 1;
      data.votes = 0;
      topicList.push(data);
    }

    this.saveTopicToMemory(topicList);
    resolve({
      success: true,
      data: data,
    });
  });
}

function removeTopic(id) {
  return new Promise((resolve, reject) => {
    let topicList = this.loadTopicFromMemory();

    const foundIndex = topicList.findIndex(x => x.id === id);

    if (foundIndex !== -1) {
      topicList.splice(foundIndex, 1);
      this.saveTopicToMemory(topicList);
    }

    resolve({
      success: true,
      data: topicList,
    });
  });
}

function loadTopicFromMemory() {
  const topicStr = localStorage.getItem('topics');

  if (!topicStr) {
    return [];
  }

  return JSON.parse(topicStr);
}

function saveTopicToMemory(topic) {
  localStorage.setItem('topics', JSON.stringify(topic));
}

export default {
  getTopics,
  setTopic,
  removeTopic,
  loadTopicFromMemory,
  saveTopicToMemory
}
