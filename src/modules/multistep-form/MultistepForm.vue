<template>
  <div class="multistep-form">
    <div class="steps">
      <div class="step" v-for="(step, index) in steps" :key="index">
        <div class="step-number-name">
          <div :class="['step-number', { 'step-number-active': isActive(index) }]">{{ index + 1 }}</div>
          <div :class="['step-name', { 'step-name-active': isActive(index) }]">{{ step }}</div>
        </div>
        <div class="step-arrow" v-if="index <= 1"><img src="../../assets/arrow.svg" /></div>
      </div>
    </div>
    <div class="divider"></div>
    <form class="form-content">
      <component :is="currentStepComponent" :currentStep="currentStep" :userData="userData" @next="nextStep"
        @prev="prevStep" @submit="submitForm" />
    </form>
  </div>
</template>
  
<script lang="ts">
import { shallowRef } from 'vue';
import AddressForm from './components/steps/AddressForm.vue';
import ContactForm from './components/steps/ContactForm.vue';
import PersonalDataForm from './components/steps/PersonalDataForm.vue';
import { Address } from './entities/Address.entity';
import { Contact } from './entities/Contact.entity';
import { PersonalData } from './entities/PersonalData.entity';
import { UserData } from './entities/UserData.entity';
import FormStep from './enums/FormStep';
import { RestTestResponse } from './service/domain/RestTestResponse';
import RestTestService from './service/rest-test.service';

export default {
  components: {
    PersonalDataForm,
    AddressForm,
    ContactForm
  },
  data: () => ({
    currentStep: FormStep.PersonalData,
    steps: ['Dados Pessoais', 'Endereço', 'Contato'],
    stepComponents: shallowRef([PersonalDataForm, AddressForm, ContactForm]),
    userData: new UserData(
      new PersonalData('', '', new Date()),
      new Address('', '', null, '', '', ''),
      new Contact('', null, null))
  }),
  computed: {
    currentStepComponent() {
      return this.stepComponents[this.currentStep - 1];
    }
  },
  methods: {
    nextStep(formDataStep: any) {
      this.updateFormData(formDataStep);
      this.currentStep++;
    },
    prevStep(formDataStep: any) {
      this.updateFormData(formDataStep);
      this.currentStep--;
    },
    submitForm(contactData: any) {
      this.userData.contact = contactData;
      RestTestService.sendFormData(this.userData).then((response: RestTestResponse) => {
        alert('Formulário enviado com sucesso!');
        alert(JSON.stringify(response.data.json, null, 2));
        console.log(response);
      }).catch((error) => {
        alert('Erro ao enviar formulário');
        console.log(error);
      });
    },
    isActive(index: number) {
      return index === this.currentStep - 1;
    },
    updateFormData(formDataStep: any) {
      switch (this.currentStep) {
        case FormStep.PersonalData:
          this.userData.personalData = formDataStep;
          break;
        case FormStep.Address:
          this.userData.address = formDataStep;
          break;
        case FormStep.Contact:
          this.userData.contact = formDataStep;
          break;
        default:
          throw new Error('Invalid step');
      }
    }
  }
};
</script>
  
<style scoped>
.multistep-form {
  display: flex;
  width: 592px;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid var(--base-gray-100, #E1E1E6);
  background: var(--base-white, #FFF);
}

.steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.step {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  flex-grow: 1;
}

.step-number-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.step-number {
  width: 28px;
  height: 28px;
  margin-left: 8px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  background: #E1E1E6;
  border-radius: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
  text-align: center;
  color: #8D8D99;
  font-size: 14px;
  font-family: Titillium Web;
  font-weight: 700;
  line-height: 21px;
  word-wrap: break-word;
}

.step-number-active {
  background: #633BBC;
  color: white;
}

.step-name {
  color: #8D8D99;
  font-size: 16px;
  font-family: "IbmPlexSansBold";
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  padding-left: 8px;
  padding-right: 8px;
}

.step-name-active {
  color: #323238;
}

.step-arrow {
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.divider {
  width: 528px;
  height: 1px;
  background: #E1E1E6;
}
</style>
  