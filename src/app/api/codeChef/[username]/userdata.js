import puppeteer from "puppeteer";

function formatToJson(object) {
    const val = Object.fromEntries(
        Object.entries(object).map(([key, value]) => [
            key,
            value.trim().replace(/\s+/g, " "),
        ])
    );
    return val;
}

function ratingOBJ(str) {
    // const str = '1272 (Div 4) ★ CodeChef Rating (Highest Rating 1272)';

    // Extract the first rating (before '(')
    const ratingMatch = str.match(/^(\d+)/);
    const currentRating = ratingMatch ? Number(ratingMatch[1]) : null;

    // Extract division inside parentheses after rating
    const divisionMatch = str.match(/\((Div \d+)\)/);
    const division = divisionMatch ? divisionMatch[1] : null;

    // Count stars by counting '★' characters
    const stars = (str.match(/★/g) || []).length;

    // Extract highest rating inside parentheses at the end
    const highestRatingMatch = str.match(/\(Highest Rating (\d+)\)/);
    const highestRating = highestRatingMatch
        ? Number(highestRatingMatch[1])
        : null;

    // Compose final object
    const result = {
        currentRating,
        highestRating,
        division,
        stars,
    };

    return result;
}

function parseRank(rankStr) {
    if (!rankStr) return null;

    const globalMatch = rankStr.match(/(\d+)\s*Global Rank/);
    const countryMatch = rankStr.match(/(\d+)\s*Country Rank/);

    return {
        globalRank: globalMatch ? Number(globalMatch[1]) : null,
        countryRank: countryMatch ? Number(countryMatch[1]) : null,
    };
}

function contestCountOBJ(str) {
    const match = str.match(/\d+/);
    return match ? Number(match[0]) : 0;
}

const scrapping = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // const username = "himanshu_bijja"
    // const CODECHEF_USER_PROFILE_URL = `https://www.codechef.com/users/${username}`
    await page.goto("https://www.codechef.com/users/potato167", {
        waitUntil: "domcontentloaded",
    });

    const title = await page.evaluate(() => {
        const rank = document
            .querySelector(".rating-ranks")
            ?.textContent?.trim(); // global rank country rank
        const rating = document
            .querySelector(".rating-header.text-center")
            ?.textContent?.trim(); //codechef rating
        const contest = document
            .querySelector(".contest-participated-count")
            ?.textContent?.trim(); //codechef rating

        return { rating, rank, contest };
    });

    await browser.close();

    const highestRatingObj = ratingOBJ(title.rating);
    const rankObj = parseRank(title.rank);
    const contestCountObj = contestCountOBJ(title.contest);
    const data = formatToJson(title);
    return {
        // ...data,
        rating: highestRatingObj,
        rank: rankObj,
        contestCount: contestCountObj,
    };
};

scrapping().then(console.log);
