const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "환영합니다";
const byeChannelName = "환영합니다";
const welcomeChannelComment = "새로운 플레이어가 감지되었습니다. 자동으로 평범한 유저로 변경되었습니다.";
const byeChannelComment = "플레이어의 추방이 감지되었습니다.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '!help를 쳐보세요.' }, status: 'online' })

  let state_list = ['----------- 서버 상태 -----------','신스카트라 1서버ㅣ정상작동','신스카트라 1서버ㅣ정상작동','신스카트라 2서버ㅣ정상작동','신스카트라 2서버ㅣ정상작동','신스카트라 3서버ㅣ서버중지','신스카트라 3서버ㅣ서버중지','----------- 서버 안내 -----------','----------- 서버 안내 -----------','[안내] 게임도중에 비신사적','[안내] 행위를 하시는 유저를','[안내] 발견시 신고해주시면','[안내] 제재 해드리겠습니다']
  let state_list_index = 1;
  let change_delay = 4000;

  function changeState() {
    setTimeout(() => {
      console.log( '상태 변경 -> ', state_list[state_list_index] );
      client.user.setPresence({ game: { name: state_list[state_list_index] }, status: 'online' })
      state_list_index += 1;
      if(state_list_index >= state_list.length) {
        state_list_index = 0;
      }
      changeState()
    }, change_delay);
  }

  changeState();
});

client.on('message', (message) => {
  if(message.content == '!혈소판아 상태') {
    message.reply('정상 작동 중 입니다.');

  }
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == ""));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == 'embed') {
    let img = 'https://cdn.discordapp.com/icons/419671192857739264/6dccc22df4cb0051b50548627f36c09b.webp?size=256';
    let embed = new Discord.RichEmbed()
      .setTitle('타이틀')
      .setURL('http://www.naver.com')
      .setAuthor('인물 없음', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('Inline field title', 'Some value here')
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here1\nSome value here2\nSome value here3\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('제작 : minltop official')

    message.channel.send(embed)


  } else if(message.content == '!혈소판아 상태') {
    let helpImg = 'https://cdn.discordapp.com/attachments/677771821386432513/731108732431237140/117787afaa0298ea67088fc13a9b6a48.jpg';
    let commandList = [
      {name: '혈소판 정신 상태', desc: '매우 정상'},
      {name: '혈소판 버전', desc: 'V.0.1.0'},
      {name: '혈소판 서버', desc: 'vs sever : 10ms'},

    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('= 혈소판 상태 =', helpImg)
      .setColor('#186de6')
      .setFooter(`제작 : minltop official`)
      .setTimestamp()

   
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed) 

    


  } else if(message.content == '!혈소판아 업데이트') {
    let helpImg = 'https://cdn.discordapp.com/attachments/677771821386432513/731108732431237140/117787afaa0298ea67088fc13a9b6a48.jpg';
    let commandList = [
      {name: '2020-07-10 : V.0.0.2', desc: '기타 혈소판 명령어 6종 추가'},
      {name: '2020-07-11 : V.0.1.0', desc: '기타 혈소판 명령어 20종 추가 및 [상태] 명령어 수정, 욕 필터링 명령어 10종 추가'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('= 혈소판 업데이트 소식 =', helpImg)
      .setColor('#186de6')
      .setFooter(`제작 : minltop official`)
      .setTimestamp()

   
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }

  if(message.content.startsWith('!청소')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { 
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 혈소판이 청소했습니다. ( 이 메세지는 잠시 후에 사라집니다 )");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);
