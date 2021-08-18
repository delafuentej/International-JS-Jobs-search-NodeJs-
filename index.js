const axios = require("axios");
const chalk = require("chalk");
const args = process.argv.slice(2);
const countryCode = args[0];

const appId = "547884ab";
const appKey = "6a748a4b8cfc8e36731664147fedc0ca";
const contentType = "application/json";

let countries = {
    "at": "Austria",
    "au": "Australia",
    "br": "Brazil",
    "ca": "Canada",
    "de": "Germany",
    "fr": "France",
    "gb": "Great Britain",
    "it": "Italy",
    "nz": "New Zealand",
    "pl": "Poland",
    "ru": "Russia",
    "sg": "Singapore",
    "us": "USA",
    "za": "South Africa"
}



if (args.length === 0) {
    console.log("Please enter the country code (as an CLI-argument) where you want to search for a job:")
    for (let keys in countries) {
        const codeCountries = `'${keys}': ${countries[keys]},`;
        console.log(codeCountries)
    }

}

const keysCountries = (Object.keys(countries));

if (args.length === 1) {

    for (let i = 0; i < keysCountries.length; i++) {
        if (keysCountries[i] === countryCode) {

            const axiosData = async () => {
                await axios.get(`http://api.adzuna.com/v1/api/jobs/${countryCode}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=20&what=javascript%20developer&content-type=${contentType}`, {
                        headers: {
                            'app_id': appId,
                            'app_key': appKey,
                            'content_type': contentType
                        }

                    })
                    .then((res) => {

                        const dataArr = res.data.results;
                        /*    console.log(dataArr) */

                        //
                        dataArr.sort((a, b) => {
                            a = new Date(a.created);
                            b = new Date(b.created);
                            return a - b;
                        })


                        for (dataObj of dataArr) {

                            //job offer title
                            const title = chalk.bgYellow.black(`Job's Title: ${dataObj.title}`);
                            console.log(title);


                            //date
                            /*  console.log(dataObj.created) */
                            const year = dataObj.created.substring(0, 4);
                            const month = dataObj.created.substring(5, 7);
                            const day = dataObj.created.substring(8, 10);

                            const date = day + "-" + month + "-" + year;

                            console.log(chalk.yellow(`Date of publication: ${chalk.white(date)}`));

                            //company's name
                            const companyName = dataObj.company.display_name;
                            console.log(chalk.yellow(`Company's name: ${chalk.white(companyName)}`));

                            //job's description
                            const jobDescription = chalk.yellow(`Job's description: ${chalk.white(dataObj.description)}`);
                            console.log(jobDescription);

                            //location
                            const areaArr = dataObj.location.area;


                            /* for(let i=0;i<areaArr.length;i++){
                                console.log(areaArr[i])
                            } */

                            for (let i = 1; i < areaArr.length; i++) {
                                if (i === 1) {
                                    console.log(chalk.yellow(`Region: ${chalk.white(areaArr[i])}`))
                                }
                                if (i === 2) {
                                    console.log(chalk.yellow(`City: ${chalk.white(areaArr[i])}`))
                                }

                            }
                            //link
                            const jobLink = dataObj.redirect_url;
                            console.log(chalk.yellow(`Job's advertisement:${chalk.cyan(jobLink)}`))


                        }

                    })
                    .catch(err => {
                        console.log(chalk.red(err));
                    });

            }
            axiosData()
        }

    }

}