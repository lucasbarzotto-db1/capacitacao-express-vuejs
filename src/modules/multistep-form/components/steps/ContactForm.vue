<template>
  <div v-if="currentStep === componentStep">
    <div class="form-item">
      <label class="form-label">DDD</label>
      <input class="input" type="text" v-model="contactFormData.ddd" placeholder="DDD">
    </div>
    <div class="form-item">
      <label class="form-label">Celular</label>
      <input class="input" type="tel" v-model="contactFormData.phone" placeholder="Celular">
    </div>
    <div class="form-item">
      <label class="form-label">Email</label>
      <input class="input" type="email" v-model="contactFormData.email" placeholder="seu@email.com.br">
    </div>
    <div class="buttons">
      <button class="button-previous" @click="prevStep">Voltar</button>
      <button type="submit" class="button-send" @click="submitForm">Enviar Dados</button>
    </div>
  </div>
</template>
  
<script lang="ts">
import { Contact } from '../../entities/Contact.entity';
import FormStep from '../../enums/FormStep';

export default {
  props: ['currentStep'],
  components: {},
  data: () => ({
    componentStep: FormStep.Contact,
    contactFormData: new Contact('', null, null)
  }),
  methods: {
    prevStep() {
      this.$emit('prev');
    },
    submitForm(e: any) {
      e.preventDefault();
      this.$emit('submit', this.contactFormData);
    }
  },
  emits: ['prev', 'submit'],
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
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  display: inline-flex;
  padding-top: 16px;
}

.button-previous {
  height: 56px;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 6px;
  border: 0.50px #633BBC solid;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
  color: #633BBC;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 24px;
  word-wrap: break-word;
}

.button-send {
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
  