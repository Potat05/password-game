<script lang="ts">
    import { onMount } from "svelte";
    import type { Password } from "../password";
    import type { Rule, RuleSatisfaction } from "../rule";
    import { Rule_PasswordLengthRange } from "../rules/passwordlengthrange";
    import { Rule_MustIncludeNumber } from "../rules/mustincludenumber";
    import { Rule_NumbersMustAddToNumber } from "../rules/passwordmustadduptonumber";
    import { Rule_MustIncludeTodaysDate } from "../rules/mustincludetodaysdate";
    import { Rule_MustBeMoreExciting } from "../rules/mustbemoreexciting";
    import { Rule_JustRightTemperature } from "../rules/justrighttemperature";
    import PasswordInput from "../components/PasswordInput.svelte";
    import { Rule_MustIncludeUppercase } from "../rules/mustincludeuppercase";
    import { Rule_MustIncludeSpecialCharacter } from "../rules/mustincludespecialcharacter";


    
    /**
     * Random integer in range  
     * min..=max (inclusive)  
     */
    function randomInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }



    let password: Password;
    let rules: Rule[] = [];
    let rulesToAdd: Rule[] = [];



    type RuleSatisfactionWithIndex = RuleSatisfaction & {
        index: number;
    }

    let notSatisfied: RuleSatisfactionWithIndex[] = [];
    let satisfied: RuleSatisfactionWithIndex[] = [];



    function update() {

        let satisfactions: RuleSatisfactionWithIndex[] = [];

        for(let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            const satisfaction = rule.satisfies();
            satisfactions.push({ ...satisfaction, index: i });
        }



        satisfied = satisfactions.filter(satisfaction => satisfaction.satisfied)
            .sort((a, b) => b.index - a.index);

        notSatisfied = satisfactions.filter(satisfaction => !satisfaction.satisfied)
            .sort((a, b) => (b?.severity ?? 99999 + b.index) - (a?.severity ?? 99999 + a.index));



        if(notSatisfied.length == 0 && rulesToAdd.length > 0) {
            const rule = rulesToAdd.shift();
            if(rule === undefined) {
                throw new Error('Catastrophic error.');
            }
            rules.push(rule);

            update();
        }

    }



    onMount(() => {

        rules = [
            new Rule_PasswordLengthRange(password, 6, 100)
        ];

        rulesToAdd = [
            new Rule_MustIncludeUppercase(password),
            new Rule_MustIncludeNumber(password),
            new Rule_MustIncludeSpecialCharacter(password),
            new Rule_NumbersMustAddToNumber(password, randomInRange(40, 60)),
            new Rule_MustIncludeTodaysDate(password),
            new Rule_MustBeMoreExciting(password, [ '!', '?' ], randomInRange(2, 4)),
            new Rule_JustRightTemperature(password, {
                // These numbers are just made up.
                '🔥': 30,
                '♨️': 25,
                '🚀': 100,
                '🪔': 20,
                '🕯': 10,
                '💦': -10,
                '💧': -3,
                '🌊': -50,
                '🧊': -30,
                '❄️': -5,
                '🌨': -40
                // Room temp, Soup temp, +-5 range.   (C)
            }, 21, randomInRange(80, 100), 5)
        ];

        update();

    });

</script>

<style>

    #win-message {
        color: limegreen;
        font-size: xx-large;
    }



    .rule {
        margin: 10px;
        border-radius: 10px;
        color: black;
        font-size: x-large;
    }

    .rule-password-num {
        border-radius: 10px 10px 0px 0px;
        padding: 6px 12px;
    }

    .rule-password-msg {
        border-radius: 0px 0px 10px 10px;
        padding: 8px 16px;
    }



    .not-satisfied.rule {
        background-color: #ffdfdf;
        border: 1px solid #a80000;
    }

    .not-satisfied .rule-password-num {
        background-color: #ffbaba;
    }

    .not-satisfied .rule-password-num::before {
        color: #a80000;
        content: '\2716';
        margin-right: 12px;
    }



    .satisfied.rule {
        background-color: #e0ffdf;
        border: 1px solid #0ea800;
    }

    .satisfied .rule-password-num {
        background-color: #c0ffba;
    }

    .satisfied .rule-password-num::before {
        color: #0ea800;
        content: '\2714';
        margin-right: 12px;
    }

</style>

<PasswordInput
    bind:password={password}
    on:passwordchange={update}
/>

{#if notSatisfied.length == 0}

<div id="win-message">
    You win!
</div>

{/if}

<div id="password-rules">
    <div class="rule-container">
        {#each notSatisfied as satisfaction}
            <div class="rule not-satisfied">
                <div class="rule-password-num">Rule #{satisfaction.index + 1}</div>
                <div class="rule-password-msg">{satisfaction.message ?? satisfaction.rule.ruleText}</div>
            </div>
        {/each}
    </div>
    <div class="rule-container">
        {#each satisfied as satisfaction}
            <div class="rule satisfied">
                <div class="rule-password-num">Rule #{satisfaction.index + 1}</div>
                <div class="rule-password-msg">{satisfaction.message ?? satisfaction.rule.ruleText}</div>
            </div>
        {/each}
    </div>
</div>

