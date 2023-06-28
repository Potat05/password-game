
import type { Password } from "../password";
import { Rule, RuleSatisfactionSeverity, type RuleSatisfaction } from "../rule";



export class Rule_MinPasswordLength extends Rule {

    get ruleText(): string {
        return `Your password must be at least ${this.minLength} characters.`;
    }
    
    minLength: number;

    constructor(password: Password, minLength: number) {
        super(password);
        this.minLength = minLength;
    }

    satisfies(): RuleSatisfaction {

        if(this.password.text.length >= this.minLength) {
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
