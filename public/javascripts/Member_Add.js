var nataTeams = {}; // 팀 정보 저장 객체

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName, threadId) {
    msg = msg.trim();

    // ✅ 팀 생성
    if (msg.startsWith("/팀생성")) {
        var teamName = msg.replace("/팀생성", "").trim();
        if (!teamName) {
            replier.reply("⚠️ 팀 이름을 입력해 주세요. 예: /팀생성 1팀");
            return;
        }
        if (nataTeams[teamName]) {
            replier.reply("⚠️ '" + teamName + "' 은 이미 모집 중입니다.");
            return;
        }
        nataTeams[teamName] = { leader: sender, members: [sender] };
        replier.reply("✅ [" + teamName + "] 팀 생성 완료!\n🧑‍✈️ 파장: " + sender + "\n🙋 참가하려면 '" + teamName + "' 입력");
        return;
    }

    // ✅ 팀 참가
    if (nataTeams[msg]) {
        var team = nataTeams[msg];
        if (team.members.includes(sender)) {
            replier.reply("⚠️ " + sender + "님은 이미 '" + msg + "'에 참가 중입니다.");
            return;
        }
        team.members.push(sender);
        if (team.members.length >= 5) {
            replier.reply("🎉 '" + msg + "' 모집 완료!\n🧑‍✈️ 파장: " + team.leader + "\n👥 팀원: " + team.members.join(", "));
            delete nataTeams[msg];
        } else {
            replier.reply("🙋 " + sender + "님이 '" + msg + "'에 참가했습니다.\n📊 현재 인원: " + team.members.length + "/5");
        }
        return;
    }

    // ✅ 팀 취소
    if (msg.startsWith("/팀취소")) {
        var teamName = msg.replace("/팀취소", "").trim();
        if (!teamName) {
            replier.reply("⚠️ 팀 이름을 입력해 주세요. 예: /팀취소 1팀");
            return;
        }
        var team = nataTeams[teamName];
        if (!team) {
            replier.reply("❌ '" + teamName + "' 팀은 존재하지 않습니다.");
            return;
        }
        if (team.leader !== sender) {
            replier.reply("⛔ 파장만 팀을 취소할 수 있습니다.");
            return;
        }
        delete nataTeams[teamName];
        replier.reply("🗑️ '" + teamName + "' 팀이 취소되었습니다.");
        return;
    }

    // ✅ 팀 목록
    if (msg === "/팀목록") {
        var keys = Object.keys(nataTeams);
        if (keys.length === 0) {
            replier.reply("📭 현재 모집 중인 팀이 없습니다.");
            return;
        }
        var result = keys.map(function(k) {
            return "• " + k + " (" + nataTeams[k].members.length + "/5명)";
        });
        replier.reply("📋 모집 중인 팀 목록:\n" + result.join("\n"));
        return;
    }

    // ✅ 개별 팀 명단
    if (msg.endsWith("/명단")) {
        var teamName = msg.replace("/명단", "").trim();
        var team = nataTeams[teamName];
        if (!team) {
            replier.reply("❌ '" + teamName + "' 팀은 존재하지 않습니다.");
            return;
        }
        var membersList = team.members.map(function(member, index) {
            return (index + 1) + ". " + member;
        }).join("\n");
        replier.reply("👥 '" + teamName + "' 현재 팀원 (" + team.members.length + "/5):\n" + membersList);
        return;
    }

    // ✅ 전체 팀 명단
    if (msg === "/나타전체명단") {
        var teamNames = Object.keys(nataTeams);
        if (teamNames.length === 0) {
            replier.reply("📭 현재 모집 중인 팀이 없습니다.");
            return;
        }

        var text = "📦 전체 팀 명단:\n";
        teamNames.forEach(function(name) {
            var team = nataTeams[name];
            var membersList = team.members.map(function(member, index) {
                return (index + 1) + ". " + member;
            }).join("\n");
            text += "\n✅ " + name + " (" + team.members.length + "/5)\n" + membersList + "\n";
        });

        replier.reply(text.trim());
        return;
    }
}
