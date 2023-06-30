
import { Rule, RuleSatisfactionSeverity, type RuleSatisfaction } from "../rule";



export class Rule_MustIncludeSpecialCharacter extends Rule {

    get ruleText(): string {
        return `Your password must include a special character.`;
    }

    satisfies(): RuleSatisfaction {

        for(const char of this.password.text) {

            if(/[a-zA-Z0-9]/.test(char)) continue;
            if(/\p{Emoji_Presentation}/u.test(char)) continue;

            return {
                rule: this,
                satisfied: true
            }

        }

        return {
            rule: this,
            satisfied: false,
            severity: RuleSatisfactionSeverity.Low
        }

    }

}
