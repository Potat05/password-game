
import { Rule, RuleSatisfactionSeverity, type RuleSatisfaction } from "../rule";



export class Rule_MustIncludeUppercase extends Rule {

    get ruleText(): string {
        return `Your password must include an uppercase character.`;
    }

    satisfies(): RuleSatisfaction {

        if(/[A-Z]/g.test(this.password.text)) {

            return {
                rule: this,
                satisfied: true
            }

        }

        return {
            rule: this,
            satisfied: false,
            severity: RuleSatisfactionSeverity.Medium
        }

    }

}
