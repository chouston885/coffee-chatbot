// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');
const { ActionTypes } = require('botframework-schema');

class CoffeeBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            await context.sendActivity("Thanks for responding");
            console.log(context.activity.text)
            let response=context.activity.text
            if(response=="order"){
                await context.sendActivity("Let's help you with your order");
            }
            if(response=="fact"){
                await context.sendActivity("You want a fact?");
            }
            if(response=="shop"){
                await context.sendActivity("Here's the nearest coffee shop");
            }
            // await context.sendActivity(MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    const cardActions = [
                        {
                            type: ActionTypes.PostBack,
                            title: 'Help ordering coffee',
                            value: 'order',
                            imageAltText: 'order'
                        },
                        {
                            type: ActionTypes.PostBack,
                            title: 'Coffee fact',
                            value: 'fact',
                            imageAltText: 'Y'
                        },
                        {
                            type: ActionTypes.PostBack,
                            title: 'Wheres the nearest coffee shop',
                            value: 'shop',
                            imageAltText: 'B'
                        }
                    ];
                
                    var reply = MessageFactory.suggestedActions(cardActions, "I'm a coffee bot, how can I help you today?");
                    await context.sendActivity(reply);
                        }
            }

      

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });


    }
}

module.exports.CoffeeBot = CoffeeBot;
