<script lang="ts">
    import { onMount } from "svelte";
    import { Password } from "../password";
    import type { Rule, RuleSatisfaction } from "../rule";
    import { Rule_MinPasswordLength } from "../rules/minpasswordlength";
    import { Rule_MustIncludeNumber } from "../rules/mustincludenumber";
    import { Rule_NumbersMustAddToNumber } from "../rules/passwordmustadduptonumber";
    import { Rule_MustIncludeTodaysDate } from "../rules/mustincludetodaysdate";
    import { Rule_MaxPasswordLength } from "../rules/maxpasswordlength";


    
    function randomInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }



    let password = new Password();

    let rules: Rule[] = [
        new Rule_MinPasswordLength(password, randomInRange(5, 10)),
        new Rule_MaxPasswordLength(password, 100),
        new Rule_MustIncludeNumber(password),
        new Rule_NumbersMustAddToNumber(password, randomInRange(40, 60)),
        new Rule_MustIncludeTodaysDate(password)
    ];



    let inputContainer: HTMLDivElement;



    type RuleSatisfactionWithIndex = RuleSatisfaction & {
        index: number;
    }

    let notSatisfied: RuleSatisfactionWithIndex[] = [];
    let satisfied: RuleSatisfactionWithIndex[] = [];



    function updateRules() {

        password.text = inputContainer.innerText;



        let satisfactions: RuleSatisfactionWithIndex[] = [];

        for(let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            const satisfaction = rule.satisfies();
            satisfactions.push({ ...satisfaction, index: i });
        }



        satisfied = satisfactions.filter(satisfaction => satisfaction.satisfied);

        notSatisfied = satisfactions.filter(satisfaction => !satisfaction.satisfied)
            .sort((a, b) => (b?.severity ?? 99999) - (a?.severity ?? 99999));

    }



    onMount(() => {
        updateRules();
    });

</script>

<style>

    #password-input {
        padding: 10px;
        margin: 10px;
        background-color: #222;
        color: white;
        font-size: xx-large;
    }

    #password-input:empty::before {
        content: 'Password';
        cursor: text;
        color: gray;
        font-style: italic;
    }

    #win-message {
        color: limegreen;
        font-size: xx-large;
    }

    #password-not-satisfied {
        color: red;
        font-size: xx-large;
    }

    #password-satisfied {
        color: limegreen;
        font-size: xx-large;
    }

</style>

<div
    bind:this={inputContainer}
    id="password-input"
    contenteditable="true"
    spellcheck="false"
    on:input={updateRules}
></div>

{#if notSatisfied.length == 0}

<div id="win-message">
    You win!
</div>

{:else}

<div id="password-rules">
    <div id="password-not-satisfied">
        {#each notSatisfied as satisfaction}
            <div>Rule #{satisfaction.index + 1}: {satisfaction.message ?? satisfaction.rule.ruleText}</div>
        {/each}
    </div>
    <div id="password-satisfied">
        {#each satisfied as satisfaction}
            <div>Rule #{satisfaction.index + 1}: {satisfaction.rule.ruleText}</div>
        {/each}
    </div>
</div>

{/if}
