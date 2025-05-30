const scriptName = "여로";
var name = [["", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]];
var teamname = ["", "", "", "", "", "", "", "", "", ""];
var teamtime = ["", "", "", "", "", "", "", "", "", ""];
var plus = ["false", "false", "false", "false", "false", "false", "false", "false", "false", "false"];
var wherei = 0;
wherei = FileStream.read("sdcard/katalkbot/cp1/wherei.text");
var wherej = 0;
wherej = FileStream.read("sdcard/katalkbot/cp1/wherej.text");
var wherename = 0;
wherename = FileStream.read("sdcard/katalkbot/cp1/wherename.text");
const maxi = 10;
const maxj = 10;
answer = false;
var notice = "";
notice = FileStream.read("sdcard/katalkbot/cp1/notice.text");
for (i = 0; i < maxi; i++) {
    teamname[i] = FileStream.read("sdcard/katalkbot/cp1/teamname" + i + ".text");
    teamtime[i] = FileStream.read("sdcard/katalkbot/cp1/teamtime" + i + ".text");
    plus[i] = FileStream.read("sdcard/katalkbot/cp1/plus" + i + ".text");
    for (j = 0; j < maxj; j++) {
        name[i][j] = FileStream.read("sdcard/katalkbot/cp1/name" + i + j + ".text");
    }
}
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    function showlist(n) {
        if (plus[n] == "true")
            return "🍊 " + (Number(n) + 1) + "팀 " + teamname[n] + " 🍊\n" + "👉 " + teamtime[n] + " 출발👈 " + "\n01.(초대) " + name[n][0] + "\n02. " + name[n][1] + "\n03. " + name[n][2] + "\n04. " + name[n][3] + "\n05. " + name[n][4];
        else if (plus[n] == "false")
            return "🍊 " + (Number(n) + 1) + "팀 " + teamname[n] + " 🍊\n" + "👉 " + teamtime[n] + " 출발👈 " + "\n01.(초대) " + name[n][0] + "\n02. " + name[n][1] + "\n03. " + name[n][2] + "\n04. " + name[n][3] + "\n05. " + name[n][4] + "\n06. " + name[n][5] + "\n07. " + name[n][6] + "\n08. " + name[n][7] + "\n09. " + name[n][8] + "\n10. " + name[n][9];
    }
    if (room != "컨텐츠")
        return;
    var team = Number(msg.split("팀")[0]);
    var teami = team - 1;
    var num = Number(msg.split("번")[0].split("팀")[1]);
    var numi = num - 1;
    var now = new Date();
    var month = now.getMonth() + 1;
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var day = now.getDate();
    var date = String(now).split(" ")[0];
    if (msg == team + "팀명단" || msg == team + "팀 명단" || msg == team + "팀") {
        if (1 <= team && team <= maxi) {
            if (teamname[teami] != "")
                replier.reply(showlist(teami));
            else if (teamname[teami] == "")
                replier.reply("등록된 팀이 없습니다.\n팀을 생성해주세요.");
        }
    }
    if (msg == team + "팀 5명" || msg == team + "팀5명") {
        plus[teami] = "true";
        FileStream.write("sdcard/katalkbot/cp1/plus" + teami + ".text", "true");
        replier.reply(showlist(teami));
    }
    if (msg == team + "팀 10명" || msg == team + "팀10명") {
        plus[teami] = "false";
        FileStream.write("sdcard/katalkbot/cp1/plus" + teami + ".text", "false");
        replier.reply(showlist(teami));
    }
    if (msg == "모든명단10명") {
        for (i = 0; i < 10; i++) {
            plus[i] = "false";
            FileStream.write("sdcard/katalkbot/cp1/plus" + i + ".text", "false");
        }
    }
    if (msg == team + "팀초기화" || msg == team + "팀 초기화") {
        if (5 <= team && team <= maxi) {
            for (j = 0; j < maxj; j++) {
                name[teami][j] = "";
                FileStream.write("sdcard/katalkbot/cp1/name" + teami + j + ".text", "");
            }
            FileStream.write("sdcard/katalkbot/cp1/teamname" + teami + ".text", "");
            FileStream.write("sdcard/katalkbot/cp1/teamtime" + teami + ".text", "");
            teamname[teami] = "";
            teamtime[teami] = "";
            plus[teami] = "false";
            FileStream.write("sdcard/katalkbot/cp1/plus" + teami + ".text", "false");
            replier.reply(team + "팀 명단이 초기화되었습니다.");
        }
        if (1 <= team && team <= 4) {
            for (j = 0; j < maxj; j++) {
                name[teami][j] = "";
                FileStream.write("sdcard/katalkbot/cp1/name" + teami + j + ".text", "");
            }
            teamname[teami] = "";
            teamtime[teami] = day + "일";
            FileStream.write("sdcard/katalkbot/cp1/teamname" + teami + ".text", "");
            FileStream.write("sdcard/katalkbot/cp1/teamtime" + teami + ".text", teamtime[teami]);
            replier.reply(team + "팀 명단이 초기화되었습니다.");
        }
    }
    if (msg.startsWith(team + "팀이름") || msg.startsWith(team + "팀 이름")) {
        if (1 <= team && team <= 10) {
            teamname[teami] = msg.split("이름")[1];
            FileStream.write("sdcard/katalkbot/cp1/teamname" + teami + ".text", teamname[teami]);
            replier.reply(team + "팀 이름이 " + teamname[teami] + "(으)로 설정되었습니다");
        }
    }
    if (msg.startsWith(team + "팀 시간") || msg.startsWith(team + "팀시간")) {
        teamtime[teami] = msg.split("시간")[1];
        FileStream.write("sdcard/katalkbot/cp1/teamtime" + teami + ".text", teamtime[teami]);
        replier.reply(team + "팀 시간이 " + teamtime[teami] + "(으)로 설정되었습니다");
    }
    if (msg == "전체명단" || msg == "명단" || msg == "전체 명단") {
        var count = 0;
        var list = ["", "", "", "", "", "", "", "", "", ""];
        var daykor = "";
        switch (date) {
            case "Mon":
                daykor = "(월)";
                break;
            case "Tue":
                daykor = "(화)";
                break;
            case "Wed":
                daykor = "(수)";
                break;
            case "Thu":
                daykor = "(목)";
                break;
            case "Fri":
                daykor = "(금)";
                break;
            case "Sat":
                daykor = "(토)";
                break;
            case "Sun":
                daykor = "(일)";
                break;
        }
        for (i = 0; i < maxi; i++) {
            if (teamname[i] != "") {
                count++;
                if (count == 1)
                    list[i] = showlist(i);
                else if (count > 1)
                    list[i] = "\nㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\n" + showlist(i);
            } else if (teamname[i] == "") {
                list[i] = "";
            }
        }
        if (count != 0) {
            replier.reply("오늘은 " + month + "월 " + day + "일 " + daykor + " 입니다 :)\n\n" + notice + "\n" + "​".repeat(500) + "\n" + list[0] + list[1] + list[2] + list[3] + list[4] + list[5] + list[6] + list[7] + list[8] + list[9]);
        } else
            replier.reply("등록된 명단이 없습니다.");
    }
    if (msg.startsWith(team + "팀" + num + "번") || msg.startsWith(team + "팀 " + num + "번")) {
        if (1 <= team && team <= maxi) {
        } else
            return;
        if (1 <= num && num <= maxj) {
        } else
            return;
        forname = msg.split(num + "번")[1];
        msg = msg.replace(/ /g, "");
        if (msg == team + "팀" + num + "번취소" || msg == team + "팀" + num + "번삭제") {
            name[teami][numi] = "";
            FileStream.write("sdcard/katalkbot/cp1/name" + teami + numi + ".text", "");
            replier.reply(showlist(teami));
        } else if (name[teami][numi] != "") {
            if (msg != team + "팀" + num + "번") {
                wherei = teami;
                wherej = numi;
                wherename = forname;
                FileStream.write("sdcard/katalkbot/cp1/wherei.text", wherei);
                FileStream.write("sdcard/katalkbot/cp1/wherej.text", wherej);
                FileStream.write("sdcard/katalkbot/cp1/wherename.text", wherename);
                replier.reply(name[teami][numi] + "님이 이미 등록되어있습니다.\n" + wherename + "님으로 교체하겠습니까?\n교체하시려면 1을 입력해주세요.");
                answer = true;
                java.lang.Thread.sleep(1000 * 10);
                answer = false;
            } else {
                wherei = teami;
                wherej = numi;
                wherename = sender;
                FileStream.write("sdcard/katalkbot/cp1/wherei.text", wherei);
                FileStream.write("sdcard/katalkbot/cp1/wherej.text", wherej);
                FileStream.write("sdcard/katalkbot/cp1/wherename.text", wherename);
                replier.reply(name[teami][numi] + "님이 이미 등록되어있습니다.\n" + wherename + "님으로 교체하겠습니까?\n교체하시려면 1을 입력해주세요.");
                answer = true;
                java.lang.Thread.sleep(1000 * 10);
                answer = false;
            }
        } else if (name[teami][numi] == "") {
            if (msg != team + "팀" + num + "번") {
                name[teami][numi] = forname;
                FileStream.write("sdcard/katalkbot/cp1/name" + teami + numi + ".text", name[teami][numi]);
                replier.reply(showlist(teami));
            } else {
                name[teami][numi] = sender;
                FileStream.write("sdcard/katalkbot/cp1/name" + teami + numi + ".text", name[teami][numi]);
                replier.reply(showlist(teami));
            }
        }
    }
    if (msg.startsWith(team + "팀참여") || msg.startsWith(team + "팀 참여")) {
        var sw = false;
        for (k = 1; k < 10; k++) {
            if (name[teami][k] == "") {
                if (sw == false) {
                    if (msg == team + "팀참여" || msg == team + "팀 참여") {
                        name[teami][k] = sender;
                        FileStream.write("sdcard/katalkbot/cp1/name" + teami + k + ".text", name[teami][k]);
                        sw = true;
                        replier.reply(showlist(teami));
                    } else {
                        name[teami][k] = msg.split("참여")[1];
                        FileStream.write("sdcard/katalkbot/cp1/name" + teami + k + ".text", name[teami][k]);
                        sw = true;
                        replier.reply(showlist(teami));
                    }
                }
            }
        }
        if (sw == false) {
            replier.reply("자리가 다찼습니다.");
        }
    }
    if (msg.startsWith(team + "팀참가") || msg.startsWith(team + "팀 참가")) {
        var swi = false;
        for (k = 1; k < 10; k++) {
            if (name[teami][k] == "") {
                if (swi == false) {
                    if (msg == team + "팀참가" || msg == team + "팀 참가") {
                        name[teami][k] = sender;
                        FileStream.write("sdcard/katalkbot/cp1/name" + teami + k + ".text", name[teami][k]);
                        swi = true;
                        replier.reply(showlist(teami));
                    } else {
                        name[teami][k] = msg.split("참가")[1];
                        FileStream.write("sdcard/katalkbot/cp1/name" + teami + k + ".text", name[teami][k]);
                        swi = true;
                        replier.reply(showlist(teami));
                    }
                }
            }
        }
        if (swi == false) {
            replier.reply("자리가 다찼습니다.");
        }
    }
    if (answer == true && msg == "1") {
        name[wherei][wherej] = wherename;
        FileStream.write("sdcard/katalkbot/cp1/name" + wherei + wherej + ".text", wherename);
        replier.reply(showlist(wherei));
    }
    if (msg.indexOf("취소") != -1 && msg.split("취소")[1] == "" && msg.split("취소")[0] != "") {
        msg = msg.replace(/ /g, "");
        if (msg.startsWith(team + "팀" + num + "번"))
            return;
        myname = msg.split("취소")[0];
        ex = false;
        for (i = 0; i < maxi; i++) {
            for (j = 0; j < maxj; j++) {
                if (name[i][j].replace(/ /g, "") == myname.replace(/ /g, "")) {
                    ex = true;
                    name[i][j] = "";
                    FileStream.write("sdcard/katalkbot/cp1/name" + i + j + ".text", "");
                    replier.reply(showlist(i));
                    break;
                }
            }
        }
        if (ex == false) {
            replier.reply(myname + "님은 명단에 없습니다.");
        }
    }
    if (msg == "취소") {
        ex = false;
        for (i = 0; i < maxi; i++) {
            for (j = 0; j < maxj; j++) {
                if (name[i][j] == sender) {
                    ex = true;
                    name[i][j] = "";
                    FileStream.write("sdcard/katalkbot/cp1/name" + i + j + ".text", "");
                    replier.reply(showlist(i));
                    break;
                }
            }
        }
        if (ex == false) {
            replier.reply(sender + "님은 명단에 없습니다.");
        }
    }
    if (msg.indexOf("삭제") != -1 && msg.split("삭제")[1] == "" && msg.split("삭제")[0] != "") {
        msg = msg.replace(/ /g, "");
        if (msg.startsWith(team + "팀" + num + "번"))
            return;
        myname = msg.split("삭제")[0];
        ex = false;
        for (i = 0; i < maxi; i++) {
            for (j = 0; j < maxj; j++) {
                if (name[i][j].replace(/ /g, "") == myname.replace(/ /g, "")) {
                    ex = true;
                    name[i][j] = "";
                    FileStream.write("sdcard/katalkbot/cp1/name" + i + j + ".text", "");
                    replier.reply(showlist(i));
                    break;
                }
            }
        }
        if (ex == false) {
            replier.reply(myname + "님은 명단에 없습니다");
        }
    }
    if (msg == "삭제") {
        ex = false;
        for (i = 0; i < maxi; i++) {
            for (j = 0; j < maxj; j++) {
                if (name[i][j] == sender) {
                    ex = true;
                    name[i][j] = "";
                    FileStream.write("sdcard/katalkbot/cp1/name" + i + j + ".text", "");
                    replier.reply(showlist(i));
                    break;
                }
            }
        }
        if (ex == false) {
            replier.reply(sender + "님은 명단에 없습니다");
        }
    }
    if (msg.startsWith("/공지 ")) {
        notice = msg.split("/공지 ")[1];
        FileStream.write("sdcard/katalkbot/cp1/notice.text", notice);
        replier.reply("전체 명단 공지가 등록되었습니다.");
    }
    if (msg == "전체초기화:") {
        for (i = 0; i < maxi; i++) {
            for (j = 0; j < maxj; j++) {
                name[i][j] = "";
                FileStream.write("sdcard/katalkbot/cp1/name" + i + j + ".text", "");
            }
            FileStream.write("sdcard/katalkbot/cp1/teamtime" + i + ".text", "");
            FileStream.write("sdcard/katalkbot/cp1/teamname" + i + ".text", "");
            teamtime[i] = "";
            teamname[i] = "";
        }
        replier.reply("전체 팀 명단이 초기화되었습니다.");
    }
}
//end of f response
//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
    var textView = new android.widget.TextView(activity);
    textView.setText("Hello, World!");
    textView.setTextColor(android.graphics.Color.DKGRAY);
    activity.setContentView(textView);
}
function onStart(activity) {
}
function onResume(activity) {
}
function onPause(activity) {
}
function onStop(activity) {
}ㅣ