import { Subject } from 'rxjs';

export default class ApiService  {

    constructor() {
      this.endpoint = "http://api.yoannbraie.fr";
      this.method = {
          timeline: 'timeline'
      }
    }

    getKeywords () {
        return [
            "Swift",
            "Angular",
            "ReactJS",
            "NextJS",
            "Symfony",
            "PHP",
            "HTML 5",
            "Javascript",
            "CSS 3"
        ]
    }

    async getTimeline () {
      this.getDatas(this.method.timeline).then(data => {
        apiServiceMessages.sendTimelineDatas({datas: data})
      })
    }

    /**
     * 
     * @param {string} search 
     */
    async getDatas(method) {
      let url = `${this.endpoint}/${method}`
      let response = await fetch(url);
      let datas = await response.json();
      return datas;
    }
}

const subject = new Subject();

export const apiServiceMessages = {
    sendTimelineDatas: message => subject.next({ timelineDatas: message.datas }),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
};
