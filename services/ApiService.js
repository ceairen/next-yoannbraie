import { Subject } from 'rxjs';

export default class ApiService  {

    constructor() {
      this.endpoint = "http://api.yoannbraie.fr";
      this.method = {
          timeline: {
            path: 'timeline',
            key: 'data-timeline'
          }
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
      let storageDatas = localStorage?.getItem(this.method.timeline.key);
      if(storageDatas !== undefined && storageDatas !== null) {
        let deliverData = JSON.parse(storageDatas);
        if(deliverData.savedDate.toString() !== this.getTodayDate().toString()) {
          localStorage.removeItem(this.method.timeline.key);
        }
        apiServiceMessages.sendTimelineDatas({datas: deliverData.data})
      }else{
        this.getDatas(this.method.timeline.path).then(data => {
          let deliverData = {
            savedDate: this.getTodayDate(),
            data: data
          }
          localStorage?.setItem(this.method.timeline.key, JSON.stringify(deliverData))
          apiServiceMessages.sendTimelineDatas({datas: deliverData.data})
        })
      }
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

    getTodayDate() {
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      return year + "-" + month + "-" + day;
    }
}

const subject = new Subject();

export const apiServiceMessages = {
    sendTimelineDatas: message => subject.next({ timelineDatas: message.datas }),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
};
