
import type { Password } from "../password";
import { Rule, RuleSatisfactionSeverity, type RuleSatisfaction } from "../rule";



export class Rule_MustIncludeNumber extends Rule {

    get ruleText(): string {
        return `Your password must include a number.`;
    }

    satisfies(): RuleSatisfaction {

        if(/[0-9]/g.test(this.password.text)) {

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
