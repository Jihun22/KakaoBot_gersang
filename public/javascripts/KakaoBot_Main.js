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
        replier.reply('거상관련된 URL 있습니다. /거타 , /파거 ,/거상인포');

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