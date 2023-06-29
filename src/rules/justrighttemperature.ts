
import type { Password } from "../password";
import { Rule, RuleSatisfactionSeverity, type RuleSatisfaction } from "../rule";



export class Rule_JustRightTemperature extends Rule {

    get ruleText(): string {
        return `Your password temperature must be just right.`;
    }



    tempEmojis: {[key: string]: number};
    
    startTemp: number;
    justRightTemp: number;
    justRightTempMaxDist: number;



    constructor(password: Password, tempEmojis: {[key: string]: number}, startTemp: number, justRightTemp: number, justRightTempMaxDist: number) {
        super(password);
        this.tempEmojis = tempEmojis;
        this.startTemp = startTemp;
        this.justRightTemp = justRightTemp;
        this.justRightTempMaxDist = justRightTempMaxDist;
    }

    satisfies(): RuleSatisfaction {

        let temp = this.startTemp;

        for(let char of this.password.text) {
            temp += this.tempEmojis[char] ?? 0;
        }



        const dist = Math.abs(temp - this.justRightTemp);
        if(dist <= this.justRightTempMaxDist) {
            return {
                rule: this,
                satisfied: true,
                message: 'Your password temperature is just right. 🥣'
            }
        }



        if(temp < this.justRightTemp) {
            return {
                rule: this,
                satisfied: false,
                severity: RuleSatisfactionSeverity.High,
                message: 'Your password temperature is too cold. 🥣🧊'
            }
        } else {
            return {
                rule: this,
                satisfied: false,
                severity: RuleSatisfactionSeverity.High,
                message: 'Your password temperature is too hot. 🥣🔥'
            }
        }

    }

}
