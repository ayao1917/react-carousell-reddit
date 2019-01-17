function getTopics() {
  return this.loadTopicFromMemory();
}

function setTopic(data) {
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

  localStorage.setItem('topics', JSON.stringify(topicList));
}

function removeTopic(id) {
  let topicList = this.loadTopicFromMemory();

  const foundIndex = topicList.findIndex(x => x.id === id);

  if (foundIndex !== -1) {
    topicList.splice(foundIndex, 1);
    localStorage.setItem('topics', JSON.stringify(topicList));
  }
}

function loadTopicFromMemory() {
  const topicStr = localStorage.getItem('topics');

  if (!topicStr) {
    return [];
  }

  return JSON.parse(topicStr);
}

export default {
  getTopics,
  setTopic,
  removeTopic,
  loadTopicFromMemory
}
