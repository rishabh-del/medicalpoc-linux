'use strict';



angular.module('myApp.request', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Request', {
            templateUrl: 'Request/Request.html',
            controller: 'requestActCtrl'
        });
    }])
    .controller('requestActCtrl', ['$http', '$scope', '$location', function ($http, $scope, $location, ) {

        $http.post('/fetch', function (error, res) {
            if (error) throw error;
            console.log(res.data);
            $location.path('Request/Request.html')


        })

        $scope.getPdf = function (file, filename) {
            var data = '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xL58eeMlGORn3HQ1jaGipcXty9vLBLLJsEIgZVREJC4OMEnJJIPfHauhoFClZNdxHN6lqF9Z3F180kZKK1p+73xyMAco2BkMT79+OhroELNGpddrEDIznBqSik5JpKwwooopAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAeefEbf/AGjovl4L7n259crVbUruXVfFtppviAR2kcDAxCDJWUtjGWPQHGOldJ4g8Lza9fW851EQJbj92gh3EHuSd3tWV48sVurWyjTdNq6AsphXBKAZZiM8Djj3rvpVItQh11+Rzzi/efQ3rTVr678Q3djHaw/Y7YgPOHOckZwPf19K365fwRe2154eh8kYmjYicE5YuTksT3z1/wD1V09clVcsnG1rGsHdXFooorMsKKKKACimhcZOTyc8mnUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFJn5gMH60tACdaw9N0S5s9Wu9Qur1bmSdAn+p27ADwF+Y8e1blLTTcb26iaTOV0fwpPo+qzX0WoKVnYmSBYNqkE5wPm4x2rqqKKcpyk7yFGKirIKKKKkoKKKKACiiigAopAQRkHIpaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqvDHKjSmSYyb33KNoGxcAbffpnPvViigApu5d+zcNxGcZ5xTqKACiiigAooqIiTzgQy+Xg5XbyT2Oc/XtQBLRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBWury2soxJcTJEhO0FjjJ9P0p0dxDPbrPHKjRMNwcHjH1qnqGnvfXNq3nPFFCXYmNsMWIwMcehasSXwtctc3eySIQvC8cKlm7gAbuP949Tyc4rSMYNauzIcpLZHTw3EM+4xSK4U4JU5wcA/wAiKdJLHGNzuqrkDJOOScAfnXNHw5dGe3kWZIkjbcI0Y4jO/I25X+7tXt0/CiHwq8Bhy0TqssLyAg/PsDbj9SzZ+gAqnCH8wueXY35b+1hkeOSdFeNQ7qTyATgH86s7h61z934ekudTe+W4EcjToxG3IaNQuFP/AAJQazU8ITmGdJ5oH8zLbdp279hVSQAM8sT69OtChTavzC55X2Oyp1cfN4PZwEinjSEyFim3jGxVDf73yk5/2utdeBgYrOUYxSs7lxbe6sLRVeSHzbiFmWNkjJb5hkhsYBHpwTVipKCiiqdzfQWc0Ecz7PPYqjHgZAzgn6A0JNuyAuUVVS9tpEidbiIpM22M7xhzzwPU8H8qtUWa3AO9FMR0kUNGysp7qcin0AFFJWGNb8jXrjTrzEaBY3glCkLhsjazdAcqcdM9Pq4xcr26AbtFZ015JHrtpZjHly280jeuVaMD/wBCNWLu7trG2e5upkhhT7zyNgDt1pNNW8wLNFQvPEkDXDSKIVXeXzxtxnOfSpFYMoZSCCMgjvQA6ikzzjPNVIFuRd3Lyzq8DMohRVxsAHOT3Oc/pQBcorEtvEMEsUokjl8+CR45YoY2l2lSRnIHQ4yM4rVguIrmCOeFw8UihkZehB6Gm4tboCakpCwAJJAA6n0qhrd3PY6Ld3dqqNLBGZAr9CF5P6A0km2kBo0VUmv7e204300gSBU8wsfTFWQcgEdDQ00A6iiigAorj7bUJmtILj7dJLfveGBIQ/EiLKUPyDj7gJLdsZrsBVTi47gJ0FQW1zDdwrLBKskbZwynIODg/rVg1zun3lvpd1rMN1cRQQRXQlV5GCgCRQxGT/tbqSV07bgdFRVGzv4720+0qrpCc7GkG3cv97B6A9s1cVlYZUgjpkGk007MCG7uYrO1kuJSRGgycDn0qesTxXKsWhszHCm4gDfTzVz+maVtZFxrCafY4lkiYm74OI0wR1/vZxwM96vkbjzLz/ADaqNpUWVYy6h3BKqTyQOuPzFU9QsvtM1rcC4lhNrJ5n7tsBxjBDDuKp7zN422dUtrDI9md/8ABKUYpq4G7RRRUgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAlFYmvWN1qBtooEiZI98recu5GYDCqRkdcn8qy1tdfh/c27TJAlsfLX5M7ih4JJ4IcjHbAFaRpqSvdEOdnsdfRXIW9hrlozWltJKlspWNHAjxtLLlx33Y35yOpqa6tNfSI+Rc3LM0rDGYyVQcIe3Xqf/ANdV7FX+JC59NmdTSZycZrnrS01KXWY574y7IRKRll8vcTtTaBz9wnOe5rPg03VE3XENkbW83TPLMzIWl3two5OcA8bsDIFJU1tdBz+R2VFcvHb62XiEhu/JLswxJGJEG4Y8w9CMbuBnrUNra69C0JYXA+fzGBlQjO9i4bnnK4C4/Sn7JW+JBz+TOvorIs7W7h0hI7ie5muZdplYONyE4ztPQAc9K1qyat1LTuFct4otRqGteH7VuYzcvK69mCr/APX/AFrqjUDwxPOkzRqZIwQjkcqDjOD2zgflTpz5Jc39bDZy95H9uvtQijtyX00RG1Kg5VmbJx/3yKv67LcC60aCIufPuGWWJWwJFETsVOe2QK3sAEnHJqJ4YnmjleNDJHnY5GSueDg9s1p7W7Wm3+X9MSRm6DIj28xKGK481jPCRgxMe30wByOD1rYNQ+RELg3AUeYU2Fu5GcgfqfzqaspNN3GFYtrALvWtWllQPAUitdrDKttDM3Hf/WY/Ctuo440iUqqhQWLHHqTkn8zSTtcDAXS57LxBYSxO7WSwyxhSSxiLbTjJ/h+TjPQ/UATeI9OOo29qjI8kEdysk8a4JZMMOhBzgkHHtxzW7RV+0d0+qFYqtbRrYm2RB5Yj8tUPpjAHNc7a+HLpPDtv5khGtw26iObd9xlHypxxt4APrya6yikptbDOft9MmstWsrnJd3geO8lz/rH+UqSPqGx9cVpWVk1pNetvzHcT+aq/3cqoI/Egn8avUUObe4rGRoNjJZ21w80eyW5uZJynB2hjwCR1OAM+9Lo1pPpsT2Tqpt4nbyHDc7CSQpHqM4+gFa1FDm3e/UZy8+iXP/CK31giKbuVGZpVb/XSdQxz0JIGfT3rbvYjPpNzCFJMkDLtA5OVIq7RQ5t79wOS1PRvsvg9raG0+0XpijiGcuxZiFPzHJA5PsBWk76rYhLiSSG4jLKJbdIipUEgfI2ecZ6Ec+1bdFP2ja11FYKhnaVLeRoYxJKFJRC2Nx7DPapqKhDOL0yCy0680WK1aM3zvLHdhF2s42sXZx1wHAwT6+9dUI7kXrOZozalAFi2fMGzyd2emO2KelvDHM8yQxrK4wzhQGb6nvU9XOXM7iQlY8Wko+s391c28UqSmPyt6hsbVIJGenXFbNFRFtXt1Gc9caDLLoVxpPmK9tx9nL5yFDBgjewxjPXHuOdDTraaCOZrjaJJZS5RCWVBgAKCQM8D06k1o0VXO2rAYWo6NJc6XeW/2maUPDIsMchHysQcc4ycds1pvZwyyxzOn76L7kg4Yeoz6H06VapKTm2gKUVksMd1EZZGjndmwTym7qAfTOT7ZqGx002l/d3bStLLcLGrM2P4c+nT736VqUUc7s13AKKKKQBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAJS1geILy4ge0igkKby7uQxXIA6ZCt3Pp2qimt6rDsia0MhjtxI5kQhmOzdnj0OBjHr34rRUpSV0Q5pOzOsormhdahPpV66zbppZlht3jjKKAdo3AE5HJY9e1V49V1eKEvJERM7OoV4mcFo1Vdq4xje24gntQqLfUOdHXUU1clQWGDjkU6sywooooAKKrCQtemMP8qx5ZPLPUng7unY8VZo2AKKKKACiiigAooooAKKguEmZR5M3lkdym7NZ9hqqzrKkzKGjDMHCkK6qSpYA88EYI+nrTUW1dAa9FZ9tqcN3dtBHkjy/MSQEFXXOCR9DWhSaadmAlU7jUIbeVYiJJJmG4RxoWOPU46D61drD1G+h0nVIrid8RXarAQASwdSSpAHJB3EfXb604K7tuBqwTpcwrLHkqfUYIPQgg9DU1UdNWQRzSyRmNpZWcIeqjgDPuQM/jV6iSSbSAinnitomlnkWONerMcAVUi1W2muI4AJlMudhkhdA5AzgEgc4BP4VU1pdmoaNc4J2Xnlle2HRhn6g4/Wot1zP4jt0vwkSRK81okT7g7D5GLEgcgPwo/vHk44qME1dgdBRWHb6tc32qTwwQD7Pbzm3lJRskhQxbPQDkDHJPtVy+1OKxubWBo5ZJLl9qiNc7QMAs3ooyPzpODukBBp189xr+sWpfclsYQq/3dyZNWbzU7WxuLSCeTEt1J5UKAZLHv8AgKzrC3Nr4qumPBu7RJCD/eWR8/kHUVqXEtvHd2iSqDJIzLExA4IGSPyB/KqklzabW/QSLlFFFZjCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACigdKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApKpXV4YL60twUAl3s5Y9FUf4laoy+IEimkUWzMgZkRg4yzKQp47DJAzVRhKWyJcktzborAk8ReVcRwNbjewO/bLuCkBj1AxjC56g89Krw+JJvs5mmgjL+WG2CQKowu9vmPfaycetWqM+wueJ09LWRZ6wby+EK2zLG2/bIW5OzaDxjjlsde1a9Zyi07MpNPYKKKKQwoqCaXy2jVdhLvtwz44749T7VPRYAooooAKKKKACiiigDNl1a3TzUbzI5EJUCSJ1BPqDjke4rCbzLSztBYxT3Rs1lklP2d180srfKuRzlyOATgdeldfijFWppbIVjmLHS7rQrWzlhzP5VrFb3MIXJwuctH75JJHOfr16KGUTJvXdjOPmUqfyNS0UpSctXuMKx9XgvryM2sKRGGYKrSMxDRc5LY78dOnOPw2KKUXZ3QCEZGKjijWGJI1ztUBRliTge55NS0UgM3UrF7trV4pAr203nKpHyudpGD/30T9cVFBY3U2pR315LGTEjJFDEpCruxliTyTwB0GOeta9FUpO1gKQs1jupLiF2RpSPNXqr4GM49ccZHoM5xUklpDPLFJLGrvESUYjlc/5H5CrNFK7ArS26PcwXB4ki3AEd1PUH24B+oFOmtop5IXkXJhk8xDno2Cv8mNT0UrsAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAB0ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAK89nbXO0z28UpXoZEDY/OkNlakyE28RMo2yExj5x6H1qxRRd9xWRV+w2qurC2hDBdoIjGQOmPpzR9htPLWP7NDsU7gvljAPTOKtUU+aXcOVEaRRo25UUNzyBzycn9aloopDCiiigBpVSQSASOhI6U6iigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAAdKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKB0ooAKKKKAGjOTkDHbmnUUUAFIM85/ClooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiq1ndxXtss8JyjFlB9wSD+oNWaHdOwBRRRQAUUUUAFFRLNE7lFkRmHVQwJFZ3iO6Nn4cv5VOH8lkT/eb5V/UihJtpdwNaiooIhDbxQr0jQKPwGKloYBRRRQAUUUUAA6UUDpRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBC00aSJE0iCR8lVLDLY64Hepap3um2WoKqXltHOEOV3rkqfUHqPwrBh0PTZfEV1btbmS3gtYj5ckjuu9mfsSeyiqioyTu9vL/ggdBLqFnDKsUl1CsrHCxlxuJ9h1NTtIiY3MF3HAycZPpVC0j061vZLKztoYJUiWRhFCFG0kgcgY/hNZWsapHc+G7TVEBVUu7dyAckYlCsOOvcU1C7SQHUUVn2WopeyTReXJDPCQJIpMZAPKngkEH1B7H0rQqGmnZgFFFFAFC61OK1naN45CEQSSuoBEakkAnnPY9AelX81g3kNwfEPlxzpFDd2u0nZubMbHIGTgZEnofu1b1C8TSNOjcABA8cIZj8qZIXcx9BVuKdkt2BpVl6bcPPqerqzMUhuEjQE8D90hOPxJpLW7lGkWlz5bzl1VpNgyxBH3gM+uPwqHSPMXWdW8yIp5zRXCqeuCmzn3/d/rTUbKX9dRXNlXVxlGDD1BzUdxI0UEkkcbSuilhGpALEDpz61mtZz6devc2KGSCY5ntgQMN/fTPGfUd+vXrmJpt1D4VubhEkGp3GLuVATuaQNv2AfQbcUlBPW+g7nR2ksz28ZuI1inZcmNX3bfbPf61ZrC1V7xtQtILQNGbiKRWnC58nBQ5we+Mge9XNKuLmezAu0CzxO0cjAYVypxuX2PX26UnGyuK5o0UUVIwooooAKzLW5kn13UIc/uYI4VA/2zuY/oVrTrF0fnVtdY9ftaL+Ahjx/OqitH6fqBs5oqvcWcV0FEhlG05GyVk/PaRn8agOjWLD5oC/8AvyM38zSSVtWBaknhhKiWVELHChmAyfapqqW9hZ2jM1vbRRMwwWVQCR9at0nboBB9oj+0NAGzKqByo6gEkD+R/Ki3uo7mIPG2RnBBGCD6EdqzZEu7TVZ7qG1a5S5RF+V1Uxlc9dxHy89uc54qfSLOe0tH+1SK9zNIZZimdoY44GewAAq2kle/YC3c3C2tvJOySOEGSsaFmP0A61SN/fnmPSZsdvMmjX+RNalJUppdLgUbee/klHnWUUMXOT5+5vyC4/Wr/akpaV79LAYvhobNPnhxjyry5T8PNYj9DW1VW0s0s1lEZJEsrSnPqxyatCnJpttAQzIZIXRXaNmUgOmMr7jPGa5yDWbuyv10SULeXgK+XcFwiuvU7/RwATgA568c46SYSGCQQlRKVOwsOAccZqja6TBDYw28iCRkdZWcnlpQcl89ck/4dKqDSTvqBojOBnr3xWTBJ9o1G+0+9RJvKZJ4d6ggxtnHHqGVh+VaVykr2zrC+yQj5WPrVGws5kuri+uyv2iYKgVDlY41zhQT1OSST7+1JWs2BHrDta2sENptga6uEgMyqB5YOcn68YHuRVLXbFf7HS3hDeVDPCzZYsSfMUck8ngkn8K6CWKO4haOWNZI24KuuQfqDSNBE0PkmNfLxjaBgU41OVp+YrGHfl/+EhhnmjuHjt7ffaiJCQ8rEhgSOM7QoGePmJ7cWNMl1V9LdbqJRqCOxKuSEILEgBgOflIHHQitqilzJq1hmVo99cXpv0uo40e3uTCFjYsMbVbqQM/eo0q+mvbFr2dY4oXJaNVyWVRxhvfjt647cv021e1udSZxhZrrzUPqDGg/mDTdMt54JdQEkflwPcl4V3A8EDceOgLbjjrzTdtbAX4pUnhSWNgyOoZWHcHoalooqAAdKKB0ooAKKKKACiiigAooooAKKKKACiiigCOORJY1kjdXRhlWU5BHtUlFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUwqS6tuIAB+XsaAB3WNSznCjAzT6KKACqcNmItRurrdnz1jGMdNuf8auUlCbVwKU2nWs90tzLCDIF2FskblzkAgcEZJ4PrT7ixtrqFYpYgUWVZVUcDerbgePcZq3RTuwMjTtFSwvZ7j7RNKZEEaCQg+WgZmC56nlj17YFa9FFDbbuwCiiikBnrpNumpfbl8wScnZvOzcQAWx64GKusqupV1DKeCCMg0+ii7e4BSYGc459aWigAooooAKKKKACiiigAooooAMVWt7SO2luZIwd1xJ5r5P8AFtVf5KKs5oouAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUxWWRA6MGVhkEHIIp9ABRRRQAUUUUAA6UUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAISAMmlpCARg9KpS6nZRSmE3UbTD/lkh3v/wB8jJ/ShJvYC9RSA5APrUMFzFc+Z5TbvLkMbcdGHUUAT0UUUAFFNZlRSzEADkk1Fb3UF1EksEqujruUjuPWiwE9JVE6pY/bfsZuoxcHgIT1PoOxPt1q/Q01ugCiiigAooooAKKKKACiiigAooooAKKTpVDS79r6K4LIFeG5khIHQ7WIB/LFCTaA0KDVa5vLWz2fabmKHecJ5jhdx9BmmDU7AgsLy3wO/mr/AI0WfYC5RVe3u4LnJgnjlA7owYfmKr3t8bW4s7dFDS3M3ljPQKAWY/kD+NNJ3sBoUVTivo31KawwRLFGkv1ViRn81NS3EksUReKFpnHRFIBP4kgUrO4E2aXNZgu9XY/LpkCj/bu8fyQ1diMpjBlRFfuEYsPzwP5UOLQE1FY97PNB4h0tRIwguFmiZP4SwAZT9cK1a9DVrPuAtFFFAFG41O2tLmOG4dojJgKzoQhJ7bsYz7Zq4GUnAIJ+tY+rW8upTDTDuS0dN9y4HLLnAQHtnnJ7Ae+aZpGhx6JcPHZxx/ZHBZcj95G2fu7urKffkY79r5Y2vfUDdqlYXqX0czIpUxTyQsD6qxH64z+NXax9MRrbUNWRwVia5WWMngHci5x/wIH86lJNMDRFxE0PnI3mR9jH82e3GK5zxLr9rF4f1hF83zIoDGxMTAIzjaoJ9fmB+lW7SRYfFFzbWZD28kZmuFXlYZsgD6FgSSP9nPeprjRIp7LUrUSN5d6HJVgMIzDBPTJ7HmtIqMZJyA0raFLa2hhj+5Giov0AwKnzWXd2U+oaIbVpPImkRQxX5sEYJHBGQcY6jg0w6S8q+XdXtxMjsGeMbVQkEEY43KBgcBvz5qLJ63A1qYkiSbgjq207Wwc4PoaxtHjmsL7ULKYyshm8+3dyzZjKgEZOeQQePcetLpRaLX9Ztgcxbop1H91nUhh+aZ/GhwtfXYDcoqNJFcEowYAkHBzgjqKkqQAdKKQdBS0AFFFFABRRRQAUUVBCswVvPdGJY42DAA7fjQBPRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUABOBmiiigDKfQrGaaWWdJJ/McuVmlZ0HsFJwB7Yqt4bhitdImuBGkQlnmkYIoACh2Cjj0UAVvVGI1ClQowc5HbnrVc7tZsDOsNYh1C5EMcci5torpS4Ayrlsfj8v61ladNeS3etR2JiDpfsS8qllH7uP5cAg5Jzz2/Gtyz0yzsXZreBUYqE3ckhR0UZ6KOwHApq6XaLFLGqyoJZGlfy5nQlmPJyCDVc0VewBpN8dQs/NePypkdo5o852upwwz3GRwfStCqlnZwWNuIbdNiAk4ySSSckknkknuat1DtfTYDI8Q2/maTLcIQtzaA3ED/3XUE/kRkH2JqjqthFPolxqdlDs1HyvtUMyLmTeFyBnqQfu46Y4rfmhS4gkilXdHIpRl9QRgipAAqgAYA4AFNSaSsBky6SLnw8tkx2zeUpWTukoGQ+fXdzWfe69dNoFtdWrQW80jGOeS4BKW7hWyGwePnAXJ45rp6aEVc4UDJycDqaFPurgYE+uSwRaPcSQuDex7TAoyfMZQyjPboRn35qaK7vrPUIYNRaOWK64ikjTaI5MEmM+oIBwfY57VqvBHLLG7xqzxMTGxGSpIwSPTgkVPT5lbRAc9Yz6rLqmrQr5QiiuF8ppyWKgxqcADtnJ696nsri+trmeDUEklZpd8MkMR8sqQOO+0gg9T361rKqqzFVALHJIHU9P6CpKHJPoBiapcala2FzqCSQItvG0vkshYsFGSC2eCQOw496n05p71Y9Ql3xrLGGigJxsUjPzerH9K0mUMpVgCCMEHvTqXNpsAUUUVIBRRRQAlYvh9Cv9qAnDfb5iR6ZwR+mD+NbdFNOyaAheGKRgzxqzKCAWUEj/OKYLG1DbhbQ7vXyxmrFFJNrqKyFFUL+wTUI0UtJE8TiSKWMgNGwyMjOR0JGCMEGr9FCbTuMpWtkLeR5nczXEihWlYAEgZwMDoOT+dXaKKG22AUUUUAQS28U0kLyIGaF98ZP8LYK5/IkfjU9FFFwCiiigAooooAKYyq6lWAZSMEEZBp9FAEMMEVtGI4IkiQdFRQoH4CpqKKL3AKKKKAEqlY2YtWnkZt89xIZJHxj2AHsAAP171eooV0gK1tZw2YlECBRLK0r+7Mck1ZoooYAOlFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRTScDPP4DNOoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBqAhACckDk06iigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKPWgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAAdKKB0ooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiik9aAFooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBB90UtIPuiloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooqhqGp22mpC905SOWURB8fKGPTJ7D3oSbdkBfooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEHQUtIOgpaACiiigAooooAKKKKACiiigAooooAKKKKACimMGO3awAB5BGcin0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUF1awXlu8FzEksLjDI65B/Cp6KE7aoDFsJJNOuV0u5ZnQjNrM3V1H8DH+8v6jnsa2aqX9jDqFuYZQQMhldThkYdGU9iKradeymY2F8QL2MZDAYWZP76/pkdj7Yqn7yut+oGrRRRUgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAIPuilpB90UtABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABVDUNPW/hC7mimjO6GdPvRt6j+o6EcVfooTadwMzTb2SVntLwKl9CB5ijo47Ov+yf0ORWlVDUNPW8VJUcw3UR3QzKOVPp7qe470zTtQe4d7a7QQ30Q/eRDow/voe6n9Oh5qmlJXQGnRRRUgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAi/dHOeKWkHSloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooppGSOSMfrQA6iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArP1HTlvY0ZJDDcxHdDMo5Q/1B7jvWhRQm07oDM02/a5Z7a6QQ30OPNjB4I7Ovqp/ToeRWlWbqOnG6CT2ziG8hJMMuMjnqrDup7j8eop+nX4vI3R0MNzCQs0DHJQ/1B6g96ppNXQGhRRRUgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAAOlFA6UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVk6nYTPIl9YEC/hHy7jhZUzkxt7Hsex59c61FNNpgUtPv4dRthNFlSCVdGGGjcdVYdiKu1i38EmnXTaraxs6kAXUCDJkUdHUf3l/UcdhWrDPHcQpNC6vG6hlZTkEHvQ0t1sBLRRRSAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAB0ooHSigAooooAKKKKACiiigAooooAKKKKADHOaKKKACiiigAooooAKKKKACiiigAooooAKKKKAExiloooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBCKxQP7EuSw40yd+R2t5Ceo/2GP5E+h426jliSaJopVDo4IZWGQQe1CdtOgElFYtrM2kXMdhcOz20h2207nJB/55sfX0Pfp1HO1TasAUUUUgCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiikJwCaAFopAQwBHQ0tAAOlFFFABRRRQAUUdqKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKO9FABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAVru0hvbaSCdA8bjDKf88H3qhY3M1pcLpl85aTH+j3DH/XqOx/2wOvr1HfGxVS+sYb+3MMobGQyspwyMOjKexFUmrWewFuisixvpo7j+z9QZRdAExSAYE6D+IejDuPx6Vr0mrAFFFFIAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAqXtjFfweXMDwQyOpwyMOjKexqtZ3UqS/Y74gXSglJBwsy/3h6Edx2+hrUqne2iXcRRiUdTujkUfMjDoR/nnpTTVrPYC5RVKynklVorgBbmLiQDofRh7H/Edqu0mraAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRSA5oAWiiigAooooAKKKKACiiigAooooAM0UU0sq4yQMnAyepoAdRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAEZjUyiTHzgEZ9vSpKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoxRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFACEgdaWiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACjpRRQAUUUUAZd/qn2WQw29rPeXIGTFCB8oPQsSQB/OqVv4mI1aHTNR026sp5xmGRsPE5xnbvHG72qzZTJaX95BcYSaaUyo7cCVMDofVQMEdsZ71Ksv9pSI0a5tI2DbyMiVh02+wPOe+BitLJKzXzA0qM4qncaha2j7JZCXxu8uNS749dqgnFY8s2l3+kyX13OB5m4I0mVMRGcBQeVYdcjnv0qY029XsB0tFZVtqXl6BZ3t0HLyQxFgilmLMB0A68mqFlrFvPrOpXId/s8MECq2xvmyXzgYyecD6jFNU2032A6SiqWnahFqdmlzEHVWJBSQYZGBwVYdiCKu1DTTswCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEP0zS0UUAFFFFABRRRQAUUUUAFFFMZA5UksNpzwcZ+tAD6KKKACiiigAooooAKKKKACiiigBKx9SvpLd5yJjF5UQkVQqkv1yfmIyBjoCD+lbHSo3ijlKl0VipyMjOKcWk7tCkm1oYjajcLNIftKlSWCgKCEwe/8QIGc5yKk+3Tm6CGdQqMoXgfvgX2n8h6dzWwIow7OEUM3BbHJpdijbhRx046VfPHsTyy7nPPqN2tqS93GjDc3mqUZWbaCqDgdeffjrUkmqXLS3KEtbhQgTzF24y+0sWIxz26/0rd2L02jGc9O9KUBBBAIPXNHPHsLll3K+nyvNYQSyHLsgLHHU1aNJQazeruaIWiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKyH121bUJdOtt1zfRAF4oxwmem5jwP5+1a9RJFHGWKIq7jltoxk+ppqy3AzJ9HGqJt1YrLHnIt48hFPqT1Y+/A9qrSLf2cki2ssl1YxYEqMczL3xG38XGODz6HNaV5q1jYnZPcL5p6RJ8zn6KOax7T+2pY5VsoY7WCSZ5FmustIAxLfcBx34yfTitoczWu3nsBrRJbz6WxsdmyeIsjj+LI4JPX8TXLCKK6lvY5pZE8+Z1ktIE82TyyqAjcpITJU5Poe1b1p4ct4LaOG4nuLwIOkz/IcnJ+QYU/iDWtDDFbxCOGJI0HRUUAD8BQqihezuFjCtLKeBU+xaW0YQYRr+8Zygxj5QC+OPcVPJo15dzpPd6gI3XhRaQhCB6Fm3E/pWosciKoE7Md2WLgEkenGAKnrP2jvdBYhgtordpTGMGV97+7YAz+QFT0UVDdwCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACij6UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRSAADApaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqpd2UV4oWYy7R/CkrID9cEZq3RQm09AKlpp9rZKRbW0UWeuxACfqe9W6KKLtvUAooooAKKKKACiiigAooooAKKKKACiijv7UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFADWUMpVgCCMEHvSIixoqIoVVGAAOAKfRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRTVZWJAOdpwadQAUmRnGeaWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAarB1DLyCMg06snwyc+FNHI/58YP/AEAVrUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAJkZxnmloooAKKKKACiiigAoozRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRSZz0oAWiiigAooooAKKKKACiiigDI8MYPhPRsdPsMH/osVr1j+F/+RR0XH/PjB/6LFbBoe4lsFGM0UUDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAaFUEsFALdSB1p1FFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUU0gEg88e9OoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDI8K/8AIoaL/wBeEH/ota1zWR4WOfCOin1sIP8A0Wta5oe4lsFFFFAwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopmweZu+bOMdTj8ulPoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAyPCpz4R0U4x/oEH/AKLWtc1j+FP+RQ0T/rwg/wDRa1sGh7iWwUUUUDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDH8J/8ifof/YPg/8ARa1sGsbwmc+DtDP/AFD4P/Ra1smh7iWwUUUUDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopAABgDFLQAUUUUAFFFFABRRRQA0KATgAZOT706iigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAAxRRRQAUUUUAFFFFABRRRQBieEP+RK0L/sH2//AKLWts1h+Df+RH0D/sHW/wD6LWtyh7iWwUUUUDCiiigAooooAKTPJGD9aWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKTAzmgBaKKKACiiigAooooAKKKKACiiigDD8G4/4QjQMdP7Ot8f9+1rbrE8Gf8iPoH/YOt//AEWtbdD3YlsLRRRQMKKKKACiiigBq7uckdeMelOoooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApAAOgpaKACiiigDD8Hf8iVoX/YPg/9FrW5WJ4Q/wCRM0PHT7BB/wCi1rbNN7iWwUUUUhhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUwxqzKxHzL0NPoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApAcjoR9aWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmhQCSAATycd6dRQAUUUUAFFFFAGJ4OIPgjQSOh063/APRa1tmsTwdn/hCNBz1/s63z/wB+1rbND3EtgooooGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUHpRRQA1QVUAtuIHJPenUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAHaiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMTwf8A8iVoX/YPg/8ARa1tmsXwiCPBuhg9f7Pg/wDRa1tGm9xLYKKKKQwooooAKKKKACiiigAooooAKKKKACiiigAopjNt2/KTk44HSn0AAGKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiimk4BPJx6UAO6iioreYXFukwR0DjO1xgj6ipaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMXwjz4M0L/sHwf+i1raNYvhIY8G6GPTT4P/Ra1tGm9xLYKKKKQwoooGaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMXwiNvg3Qx6afB/6LWto1jeEhjwfoo9LCD/0AVs03uJbBRRRSGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFRNIqOgbOXOBwT/wDqqWigAooooAKKKKACiiigAxzmiiigAopMAZ469aWgAooooAKKKKACiiigAooooAx/CnHhDRf+vCD/ANAFbBrG8Kf8ifonT/jwg6f7i1smh7ggooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoo70UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUARySxxFA7Bd7bV9z6VJRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBjeE+fB2ikf8APhB/6AK2TWL4SOfBuhnGP9Ag/wDQFraND3BBRRRQAUUUUAFFFFABRRRQAUUUUAFNKhlIIyD1FOooAaqhFCqAFAwAO1OoooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMbwtFLD4S0eKaOSOWOyhR0kUqysEAIIPQ1s0UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAQxzeZI6eXIhQ4yy8N9DU1FFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//ZZW5kc3RyZWFtDWVuZG9iag0yIDAgb2JqDTw8IC9MZW5ndGggNDcgDT4+DXN0cmVhbQ1xIDU5NS4yMCAwIDAgODQwLjk2IDAuMDAgMC4wMCBjbSAxIGcgL0ltMSBEbyBRDWVuZHN0cmVhbQ1lbmRvYmoNMyAwIG9iag08PA0vVHlwZSAvUGFnZQ0vTWVkaWFCb3ggWzAgMCA1OTYgODQxXQ0vUGFyZW50IDQgMCBSIA0vUm90YXRlIDAgL1Jlc291cmNlcyA8PA0vUHJvY1NldCBbL1BERiAvSW1hZ2VDIC9JbWFnZUIgL0ltYWdlSV0NL1hPYmplY3QgPDwNL0ltMSAxIDAgUg0gPj4NID4+DS9Db250ZW50cyBbIDIgMCBSDV0NPj4NZW5kb2JqDTQgMCBvYmoNPDwNL1R5cGUgL1BhZ2VzDS9LaWRzIFsgMyAwIFJdDS9Db3VudCAxDT4+DWVuZG9iag01IDAgb2JqDTw8DS9UeXBlIC9DYXRhbG9nDS9QYWdlcyA0IDAgUiAgDT4+DWVuZG9iag02IDAgb2JqDTw8IC9DcmVhdG9yICgpDS9DcmVhdGlvbkRhdGUgKCkNL0F1dGhvciAoKQ0vUHJvZHVjZXIgKCkNL1RpdGxlICgpDS9TdWJqZWN0ICgpDT4+DWVuZG9iag14cmVmDTEgNw0wMDAwMDAwMDAwIDY1NTM1IGYgDTAwMDAwMDAwMDkgMDAwMDAgbiANMDAwMDAyNDg3MiAwMDAwMCBuIA0wMDAwMDI0OTY5IDAwMDAwIG4gDTAwMDAwMjUxNTYgMDAwMDAgbiANMDAwMDAyNTIxNCAwMDAwMCBuIA0wMDAwMDI1MjY1IDAwMDAwIG4gDXRyYWlsZXINPDwNL1NpemUgNw0vUm9vdCA1IDAgUg0vSW5mbyA2IDAgUg0+Pg1zdGFydHhyZWYNMjUzNjENJSVFT0YN'
            $http.post('/request', data).then(function (error, resp) {
                if (resp == "success") {
                    $scope.resp = "success";
                    console.log("success");   
                }
                else {
                    $scope.resp = "pending";
                    console.log("pending");
                }



            });
        }

    }]);