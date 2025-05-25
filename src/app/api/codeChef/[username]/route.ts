import puppeteer from "puppeteer";

const scrapping = async ()=>{

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    // const username = "himanshu_bijja"
    // const CODECHEF_USER_PROFILE_URL = `https://www.codechef.com/users/${username}`
    await page.goto("https://www.codechef.com/users/himanshu_bijja", 
        {
            waitUntil : "domcontentloaded"
        }
    )

    const title = await page.evaluate(()=>{
        const rank = document.querySelector(".rating-ranks")?.textContent?.trim();// global rank country rank
        const rating = document.querySelector(".rating-number")?.textContent?.trim(); //codechef rating
        const highestRating = document.querySelector(".rating-number")?.textContent?.trim(); //codechef rating

        // return ranking;
    })

    await browser.close();

    return title;

}

// scrapping().then(console.log);

scrapping().then(console.log);