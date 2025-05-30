 var allsee = new Array(1000).join(String.fromCharCode(847));
    var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();//절대경로
    function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
        msg =msg.trim();

        if (msg == 'ㄱㅁㄴ') {
            replier.reply('오늘도 좋은하루되세요 ♥ ');
        }

        if (msg == 'ㄱㄴㅇ') {
            replier.reply("오늘도 고생하셨어요 굿밤 되세요♥");
        }

        if (msg == '/기능') {
            replier.reply('거상관련된 URL 있습니다. /거타 , /파거 ,/거상인포 ,/주인공 ,/몬스터 ,/용병,/보너스스텟  입력해보세요!');

        }
        if (msg == '/루키') {
            replier.reply('부르셨나요? 주인님?');
        }

        if (msg == '물어') {
            replier.reply('🐶🐶🐶🐶🐶');
        }



        if(msg =='/거타') {
            replier.reply('https://geota.co.kr/');
        }


        if(msg =='/파거') {
            replier.reply('https://cafe.naver.com/gersangjjang');
        }

        if(msg =='/거상인포') {
            replier.reply('https://www.gersanginfo.com/');
        }

        if(msg =='/주인공'){
            replier.reply('https://www.gersanginfo.com/mercenary/main-character');
        }

        if(msg =='/몬스터'){
            replier.reply('https://www.gersanginfo.com/mercenary/monster');
        }

        if(msg =='/장수'){
            replier.reply('https://www.gersanginfo.com/mercenary/general');
        }

        if(msg =='/용병'){
            replier.reply('https://www.gersanginfo.com/mercenary/mercenary');
        }

        if(msg =='/보너스스텟'){
            replier.reply('https://www.gersanginfo.com/calculator/bonusStats');
        }

        if (msg == '/나타') {
            replier.reply('나타관련된 파티명단 만들수있는 명령어 입니다 : 방장만 생성 취소 가능합니다 .ex:/팀생성 1팀  , /팀목록 ,/팀취소 1팀 (방장만 살아있습니다) 삭제 할시 /팀삭제 1팀 , /나타전체명단 , 참가하실분:1팀 입력하면됩니다. ,유저 팀취소:/취소 하시면됩니다.  ');

        }

        if (msg == '/지국천왕가1') {
            replier.reply('어느 뜨거운 여름날 , 사내 몇이 모여 한 평생 의를 함께 하기로 하였으니 , 형제들의 기쁨은 우리의 기쁨이고 형제들의 슬픔은 우리의 슬픔이다!');

        }

        if (msg == '/지국천왕가2') {
            replier.reply('누군가 먼 훗날 청춘 시절 어디서 무얼 했느냐 묻는다면 , 수미산 억센 비바람과 눈보라 형제들과 함께 맞으며 불타는 각천검 어깨에 걸쳐둔채 청춘을 다 바쳤다고 답하리라!');

        }




        function save(originpath, content) {
            // originpath는 sdcard/폴더/파일
            var splited_originpath = originpath.split("/");
            splited_originpath.pop();
            var path = splited_originpath.join("/");
            var folder = new java.io.File(path);
            folder.mkdirs();
            var file = new java.io.File(originpath);
            var fos = new java.io.FileOutputStream(file);
            var contentstring = new java.lang.String(content);
            fos.write(contentstring.getBytes());
            fos.close();
        }
        function read(originpath) {
            var file = new java.io.File(originpath);
            if (file.exists() == false)
                return null;
            try {
                var fis = new java.io.FileInputStream(file);
                var isr = new java.io.InputStreamReader(fis);
                var br = new java.io.BufferedReader(isr);
                var temp_br = br.readLine();
                var temp_readline = "";
                while ((temp_readline = br.readLine()) !== null) {
                    temp_br += "\n" + temp_readline;
                }
                try {
                    fis.close();
                    isr.close();
                    br.close();
                    return temp_br;
                }    catch (error) {
                    return error;
                }
            }  catch (error) {
                return error;
            }
        }
    }


    function save(originpath, content) {
        // originpath는 sdcard/폴더/파일
        var splited_originpath = originpath.split("/");
        splited_originpath.pop();
        var path = splited_originpath.join("/");
        var folder = new java.io.File(path);
        folder.mkdirs();
        var file = new java.io.File(originpath);
        var fos = new java.io.FileOutputStream(file);
        var contentstring = new java.lang.String(content);
        fos.write(contentstring.getBytes());
        fos.close();
    }
    function read(originpath) {
        var file = new java.io.File(originpath);
        if (file.exists() == false)
            return null;
        try {
            var fis = new java.io.FileInputStream(file);
            var isr = new java.io.InputStreamReader(fis);
            var br = new java.io.BufferedReader(isr);
            var temp_br = br.readLine();
            var temp_readline = "";
            while ((temp_readline = br.readLine()) !== null) {
                temp_br += "\n" + temp_readline;
            }
            try {
                fis.close();
                isr.close();
                br.close();
                return temp_br;
            }    catch (error) {
                return error;
            }
        }  catch (error) {
            return error;
        }
}