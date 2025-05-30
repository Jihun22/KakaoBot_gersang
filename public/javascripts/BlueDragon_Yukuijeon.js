function getCheongryongMultiway() {
    try {
        const url = "https://www.gersanginfo.com/multiway";
        const doc = org.jsoup.Jsoup.connect("https://www.gersanginfo.com/multiway")
            .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36")
            .referrer("https://www.google.com/")
            .timeout(5000)
            .get();

        const rows = doc.select("table tbody tr");
        const result = [];

        for (let i = 0; i < rows.size(); i++) {
            const cols = rows.get(i).select("td");
            if (cols.size() >= 3) {
                const location = cols.get(0).text();
                const coords = cols.get(1).text();
                const desc = cols.get(2).text();

                if (location.includes("청룡") || coords.includes("청룡") || desc.includes("청룡")) {
                    result.push(`📍 ${location} (${coords}): ${desc}`);
                }
            }
        }

        if (result.length === 0) {
            return "❌ '청룡' 관련된 항목이 없습니다. 전체 서버 공통 정보일 가능성이 있습니다.\n👉 https://www.gersanginfo.com/multiway";
        }

        return result.join("\n");

    } catch (e) {
        return "❌ 사이트 연결 또는 파싱 중 오류 발생.";
    }
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
    if (msg === "/청룡") {
        replier.reply("🐉 청룡 서버 육의전 사통팔달 정보는 아래 링크에서 확인하세요:\n\n🔗 https://www.gersanginfo.com/multiway");
    }
}
