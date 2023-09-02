<template>
  <div v-if="currentStep === componentStep">
    <div class="form-item">
      <label class="form-label">Nome</label>
      <input class="input" type="text" v-model="personalFormData.firstName" placeholder="Nome">
    </div>
    <div class="form-item">
      <label class="form-label">Sobrenome</label>
      <input class="input" type="text" v-model="personalFormData.lastName" placeholder="Sobrenome">
    </div>
    <div class="form-item">
      <label class="form-label">Data de Nascimento</label>
      <input class="input" type="date" :value="defaultDate"
        @input="updateBirthDate(($event.target as HTMLInputElement).value)">
    </div>
    <div class="buttons">
      <button class="button-next" @click="nextStep">CONTINUAR</button>
    </div>
  </div>
</template>
  
<script lang="ts">
import { PersonalData } from '../../entities/PersonalData.entity';
import { UserData } from '../../entities/UserData.entity';
import FormStep from '../../enums/FormStep';

export default {
  props: {
    currentStep: {
      type: Number,
      required: true
    },
    userData: {
      type: UserData,
      required: true
    }
  },
  components: {},
  data: () => ({
    componentStep: FormStep.PersonalData,
    personalFormData: new PersonalData('', '', new Date()),
  }),
  methods: {
    nextStep() {
      this.$emit('next', this.personalFormData);
    },
    updateBirthDate(value: string) {
      if (value)
        this.personalFormData.birthDate = new Date(value);
    }
  },
  computed: {
    defaultDate() {
      return this.personalFormData.birthDate.toISOString().slice(0, 10);
    }
  },
  mounted() {
    Object.assign(this.personalFormData, this.userData.personalData);
  },
  emits: ['next'],
};
</script>
  
<style scoped>
.form-item {
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: inline-flex;
  padding-bottom: 16px;
}

.input {
  align-self: stretch;
  height: 56px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  background: white;
  border-radius: 2px;
  border: 0.50px #E1E1E6 solid;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  display: inline-flex;
}

.form-label {
  color: #323238;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  font-family: IbmPlexSansBold;
}

.buttons {
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 32px;
  padding-top: 16px;
  display: inline-flex;
}

.button-next {
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 16px;
  padding-bottom: 16px;
  background: #633BBC;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 24px;
  word-wrap: break-word;
}
</style>