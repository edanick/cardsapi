import { User, Card } from "./models/";
import { users, cards } from "./initData";
import bcrypt from "bcrypt";

export async function init() {

    if (await User.countDocuments() == 0) {

        let i = 0;
        for (let u of users) {
            u.password =  bcrypt.hashSync(u.password, 8);
            let user = await new User(u);
            user.save();

            let c = cards[i];
            let card = await new Card({...c, ...{userId: user._id.toString(), bizNumber: Math.floor(1000000 + Math.random() * 9999999)}});
            card.save();
            i++;
        }

    }

    
}