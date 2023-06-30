
import type { Password } from "../password";
import { Rule, RuleSatisfactionSeverity, type RuleSatisfaction } from "../rule";



export class Rule_MustBeMoreExciting extends Rule {

    get ruleText(): string {
        return `Your password must be exciting${'!'.repeat(this.minExcitingCharacters)}`;
    }
    
    excitingCharacters: string[];
    minExcitingCharacters: number;

    constructor(password: Password, excitingCharacters: string[], minExcitingCharacters: number) {
        super(password);
        this.excitingCharacters = excitingCharacters;
        this.minExcitingCharacters = minExcitingCharacters;
    }

    satisfies(): RuleSatisfaction {

        let numExcitingCharacters: number = 0;

        for(let i = 0; i < this.password.text.length; i++) {
            if(this.excitingCharacters.includes(this.password.text[i])) {
                numExcitingCharacters++;
            }
        }

        if(numExcitingCharacters >= this.minExcitingCharacters) {
            return {
                rule: this,
                satisfied: true
            }
        }

        return {
            rule: this,
            satisfied: false,
            severity: RuleSatisfactionSeverity.VeryHigh,
            message: `${this.ruleText} (Must include at least ${this.minExcitingCharacters} exciting characters "${this.excitingCharacters.join('')}".)`
        }

    }

}
