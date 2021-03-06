let filters = {
    init(val) {
        return 'filter init'
    },
    helloWorld() {
        return 'Hello World'
    },
    hasClass(el, className) {
        let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
        return reg.test(el.className)
    },
    addClass(el, className) {
        if (this.hasClass(el, className)) {
            return
        }

        let newClass = el.className.split(' ');
        newClass.push(className);
        el.className = newClass.join(' ')
    },
    removeClass(ele, cls) {
        if (this.hasClass(ele, cls)) {
            var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            ele.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },
    replaceData(data) {
        return data.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    },
    replaceCodeData(data) {
        return data.replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&apos;/g, "\'");
    },
    replace(data) {
        return data.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    },
    getLocalTime(UTCtime, withYear) {
        let now = new Date(UTCtime);
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let date = now.getDate();
        if (date < 10) {
            date = "0" + date;

        }
        let hour = now.getHours();
        if (hour < 10) {
            hour = "0" + hour;
        }
        let minute = now.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        let second = now.getSeconds();
        if (second < 10) {
            second = "0" + second;
        }
        if(withYear) {
            return year + '-' + month + "-" + date;
        }else {
            return month + "-" + date;
        }
        
    }

}
export default {
    install(Vue) {
        for (let key in filters) {
            Vue.filter(key, filters[key])
        }
        Vue.prototype.init = filters.init
        Vue.prototype.helloWorld = filters.helloWorld
        Vue.prototype.$replaceData = filters.replaceData
        Vue.prototype.$replaceCodeData = filters.replaceCodeData
        Vue.prototype.$replace = filters.replace
        Vue.prototype.$getLocalTime = filters.getLocalTime
        Vue.prototype.hasClass = filters.hasClass
        Vue.prototype.addClass = filters.addClass
        Vue.prototype.removeClass = filters.removeClass

    }
}