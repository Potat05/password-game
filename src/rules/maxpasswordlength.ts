
import type { Password } from "../password";
import { Rule, RuleSatisfactionSeverity, type RuleSatisfaction } from "../rule";



export class Rule_MaxPasswordLength extends Rule {

    get ruleText(): string {
        return `Your password must be at most ${this.maxLength} characters.`;
    }
    
    maxLength: number;

    constructor(password: Password, maxLength: number) {
        super(password);
        this.maxLength = maxLength;
    }

    satisfies(): RuleSatisfaction {

        if(this.password.text.length <= this.maxLength) {
            return {
                rule: this,
                satisfied: true
            }
        }

        return {
            rule: this,
            satisfied: false,
            severity: RuleSatisfactionSeverity.VeryHigh
        }

    }

}
