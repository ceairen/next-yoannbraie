export default class ApiService  {

    constructor() {
      this.endpoint = "http://api.yoannbraie.fr/";
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

    /**
     * 
     * @param {string} search 
     */
    async getDatas(search) {
      return { };
    }
  }