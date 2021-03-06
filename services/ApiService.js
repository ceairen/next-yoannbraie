import { Subject } from 'rxjs';

export default class ApiService  {

    constructor() {
      this.endpoint = "http://api.yoannbraie.fr";
      this.method = {
          timeline: {
            path: 'timeline',
            key: 'data-timeline'
          },
          creations: {
            path: 'pens',
            key: 'data-creations'
          },
          cv: {
            path: 'cv',
            key: 'data-cv'
          },
          competences: {
            path: 'competences',
            key: 'data-competences'
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

    async getDatasByMethod (method) {
      let m = method;
      let storageDatas = localStorage?.getItem(m.key);
      if(storageDatas !== undefined && storageDatas !== null) {
        let deliverData = JSON.parse(storageDatas);
        if(deliverData.savedDate.toString() !== this.getTodayDate().toString()) {
          localStorage.removeItem(m.key);
        }
        this.sendMessage(m, deliverData);
      }else{
        this.getDatas(m.path).then(data => {
          let deliverData = {
            savedDate: this.getTodayDate(),
            data: data
          }
          localStorage?.setItem(m.key, JSON.stringify(deliverData))
          this.sendMessage(m, deliverData);
        })
      }
    }

    sendMessage(m, deliverData) {
      switch(m.path) {
        case this.method.timeline.path:
          apiServiceMessages.sendTimelineDatas({datas: deliverData.data})
          break;
        case this.method.creations.path:
          apiServiceMessages.sendCreationsDatas({datas: deliverData.data})
        case this.method.cv.path:
          apiServiceMessages.sendCvDatas({datas: deliverData.data})
          break;
        case this.method.competences.path:
          apiServiceMessages.sendCompetencesDatas({datas: deliverData.data})
          break;
        default:
          break;
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
    sendCreationsDatas: message => subject.next({ creationsDatas: message.datas }),
    sendCvDatas: message => subject.next({ cvDatas: message.datas }),
    sendCompetencesDatas: message => subject.next({ competencesData: message.datas }),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
};
