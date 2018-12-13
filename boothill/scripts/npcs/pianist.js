
'use strict';

module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');

  return  {
    listeners: {
      playerEnter: state => function (player) {
        if (this.hasEffectType('speaking')) {
          return;
        }

        const speak = state.EffectFactory.create('speak', this, {}, {
          messageList: [
            "Заходи, %player%.",
            "Возьми себе выпить чего-нибудь, а я пока для тебя сыграю.",
          ],
          outputFn: message => {
            message = message.replace(/%player%/, player.name);
            state.ChannelManager.get('говорить').send(state, this, message);
          }
          
        });
        this.addEffect(speak);
        let rand = 0;
        rand = Math.floor((Math.random() * 4) + 1);
        switch (rand) {
            case 1:
                Broadcast.sayAt(this.room, `Пианистка начала наигрывать грязные частушки про ${player.vname}.`)
                break;
            case 2:
                Broadcast.sayAt(this.room, `Пианистка начала играть любовную балладу про ${player.vname}.`)
                break;
            case 3:
                Broadcast.sayAt(this.room, `Пианистка начала исполнять классическую мелодию про ${player.vname}.`)
                break;
            case 4:
                Broadcast.sayAt(this.room, `Пианистка начала исполнять популярную песню про ${player.vname}.`)
                break;
        }        
      },

      playerLeave: state => function (player) {
        const speaking = this.effects.getByType('speaking');
        if (speaking) {
          speaking.remove();
        }
      }
    }
  };
};
