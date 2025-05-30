String.prototype.geturlcode = function() {
    return encodeURIComponent(this);
};

const find = {
    naver: function(word) {
        return "https://search.naver.com/search.naver?query=" + word.geturlcode() + "+맛집";
    }
};

function naverMatzip(keyword) {
    try {
        var url = find.naver(keyword);
        var doc = org.jsoup.Jsoup.connect(url)
            .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36")
            .referrer("https://www.google.com/")
            .get();

        // 네이버에서 리스트 형태로 나오는 영역 파싱 (PC 기준)
        var list = doc.select("ul.place_list > li"); // 구조 변경 시 대응 필요
        if (list.size() === 0) return [];

        var arr = [];

        for (var i = 0; i < Math.min(list.size(), 5); i++) {
            var el = list.get(i);

            var name = el.select(".place_name").text(); // 장소명
            var category = el.select(".category").text(); // 음식종류
            var location = el.select(".sub_txt").text(); // 위치 주소
            var score = el.select(".score > em").text(); // 평점
            var review = el.select(".review").text().replace(/\D/g, ""); // 리뷰 수

            arr.push({
                순위: i + 1,
                이름: name,
                평점: score || "정보 없음",
                위치: location || "주소 없음",
                종류: category || "분류 없음",
                리뷰: review ? parseInt(review) : 0
            });
        }

        return arr;
    } catch (e) {
        return []; // 실패 시 빈 배열
    }
}

function Comma(num) {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

String.prototype.cut = function(num1, num2) {
    try {
        if (num2 == null) num2 = this.length;
        if (isNaN(num1)) return null;
        return this.substring(num1, num2);
    } catch (e) {
        return null;
    }
};

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
    const full = "\u200b".repeat(500); // 메시지 스크롤 공백

    if (msg.indexOf("맛집검색 ") === 0) {
        var keyword = msg.cut(5);
        var result = naverMatzip(keyword);

        if (!result.length) {
            replier.reply("🥲 검색된 맛집이 없어요!");
        } else {
            var output = result.map(item =>
                `${item.순위}위 ${item.이름}  ★ ${item.평점}\n📍 ${item.위치}\n🍽 ${item.종류}\n💬 리뷰 ${Comma(item.리뷰)}개`
            );
            replier.reply(`🍽 [${keyword}] 맛집 검색 결과\n총 ${output.length}개 발견!${full}\n\n${output.join("\n\n")}\n\n🔎 네이버에서 더보기: ${find.naver(keyword)}`);
        }
    }
}
