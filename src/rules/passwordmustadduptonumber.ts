


import type { Password } from "../password";
import { Rule, RuleSatisfactionSeverity, type RuleSatisfaction } from "../rule";



export class Rule_NumbersMustAddToNumber extends Rule {

    get ruleText(): string {
        return `The digits in your password must add up to ${this.number}.`;
    }

    number: number;

    constructor(password: Password, number: number) {
        super(password);
        this.number = number;
    }

    satisfies(): RuleSatisfaction {

        let total = this.password.text.split('').map(Number).filter(num => !Number.isNaN(num)).reduce((total, num) => total + num, 0);

        if(total == this.number) {
            return {
                rule: this,
                satisfied: true
            }
        }

        return {
            rule: this,
            satisfied: false,
            severity: RuleSatisfactionSeverity.Medium,
            message: `The digits in your password must add up to ${this.number}, not ${total}.`
        }

    }

}
