<template>
    <v-layout class="form" column justify-space-around>
        <v-flex class="elevation-3" xs10 offset-xs1>
            <v-layout column v-for="item in questions" v-bind:key="item.id">
            <v-layout class="card elevation-0">
                <question :question="item" v-on:answer="catchAnswer" v-on:remove="removeAns"></question>
            </v-layout>
            <v-divider></v-divider>
            </v-layout>
        </v-flex>
        <v-layout style="margin-top: 30px;" row>
        <v-spacer></v-spacer>
        <v-btn primary v-on:click="enviar">Enviar</v-btn> 
        <v-spacer></v-spacer>
        </v-layout>
    </v-layout>
</template>

<style lang="scss" scoped>
.form {
  margin: 16px;

  .card {
    margin: 1px;
    padding: 16px 32px;
  }
}
</style>

<script>
import PollService from '@/domain/Poll/PollService';
import VoteService from '@/domain/Vote/VoteService';
import OptionService from '@/domain/Option/OptionService';
import Question from '@/components/shared/Question.vue';

export default {
  components: {
    question: Question
  },
  created() {
    this.voteService = new VoteService(this.$resource);
    this.pollService = new PollService(this.$resource);
    this.optionService = new OptionService(this.$resource);
    this.pollService.listAll().then(
      response => {
        var question = response;
        this.optionService.listAll().then(
          resp => {
            this.questions = question.map((el, index) => {
              var options = resp
                .filter((elem, index) => {
                  return elem.pollId === el.id;
                })
                .map((elem, index) => {
                  return { label: elem.name, value: elem.id };
                });
              return {
                id: el.id,
                type: 'CHECKBOX',
                title: el.name,
                options
              };
            });
          },
          err => {
            console.log(err);
            alert(err.body.message);
          }
        );
      },
      err => {
        console.log(err);
        alert(err.body.message);
      }
    );
  },
  data: () => ({
    answer: [],
    questions: [
      {
        id: 1,
        type: 'RADIO',
        title: 'Uma pergunta muito interessante aqui.',
        options: [
          {
            label: 'Opção 1',
            value: '1'
          },
          {
            label: 'Opção 2',
            value: '2'
          },
          {
            label: 'Opção 3',
            value: '3'
          }
        ]
      },
      {
        id: 2,
        type: 'CHECKBOX',
        title: 'Uma pergunta muito interessante aqui.',
        options: [
          {
            label: 'Opção 1',
            value: '1'
          },
          {
            label: 'Opção 2',
            value: '2'
          },
          {
            label: 'Opção 3',
            value: '3'
          }
        ]
      }
    ]
  }),
  methods: {
    enviar() {
      var promises = [];
      this.answer.forEach(el => {
        promises.push(
          this.voteService.save({
            userId: this.$cookie.get('userId'),
            optionId: el,
            value: 1
          })
        );
      });
      Promise.all(promises).then(resp => {
        alert('Voto salvo com sucesso!');
      });
    },
    catchAnswer(payload) {
      this.answer = this.answer.concat(
        payload.answer.filter(el => {
          return !this.answer.includes(el);
        })
      );
    },
    removeAns(payload) {
      this.answer = this.answer.filter(el => {
        return !payload.remove.includes(el);
      });
    }
  }
};
</script>