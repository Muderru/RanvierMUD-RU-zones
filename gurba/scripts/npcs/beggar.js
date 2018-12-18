
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
            "Подайте на пропитание ветерану войны!",
          ],
          outputFn: message => {
            message = message.replace(/%player%/, player.name);
            state.ChannelManager.get('говорить').send(state, this, message);
          }
          
        });
        
        let rand = 0;
        rand = Math.floor((Math.random() * 100) + 1);
        if (rand > 80) {
            this.addEffect(speak);
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
