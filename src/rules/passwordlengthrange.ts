
import type { Password } from "../password";
import { Rule, RuleSatisfactionSeverity, type RuleSatisfaction } from "../rule";



export class Rule_PasswordLengthRange extends Rule {

    get ruleText(): string {
        return `Your password must be at least ${this.minLength} characters and at most ${this.maxLength} characters.`;
    }
    
    minLength: number;
    maxLength: number;

    constructor(password: Password, minLength: number, maxLength: number) {
        super(password);
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    satisfies(): RuleSatisfaction {

        if(this.password.text.length >= this.minLength && this.password.text.length <= this.maxLength) {
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
