<template>
  <div v-if="currentStep === componentStep">
    <div class="form-item">
      <label class="form-label">CEP</label>
      <input class="input" type="text" v-model="addressFormData.cep" placeholder="CEP">
    </div>
    <div class="form-item">
      <label class="form-label">Número</label>
      <input class="input" type="text" v-model="addressFormData.number" placeholder="Número">
    </div>
    <div class="form-item">
      <label class="form-label">Rua</label>
      <input class="input" type="text" v-model="addressFormData.street" placeholder="Rua">
    </div>
    <div class="form-item">
      <label class="form-label">Bairro</label>
      <input class="input" type="text" v-model="addressFormData.neighborhood" placeholder="Bairro">
    </div>
    <div class="form-item">
      <label class="form-label">Cidade</label>
      <input class="input" type="text" v-model="addressFormData.city" placeholder="Cidade">
    </div>
    <div class="form-item">
      <label class="form-label">Estado</label>
      <input class="input" type="text" v-model="addressFormData.state" placeholder="Estado">
    </div>
    <div class="buttons">
      <button class="button-previous" @click="prevStep">Voltar</button>
      <button class="button-next" @click="nextStep">Continuar</button>
    </div>
  </div>
</template>
  
<script lang="ts">
import { Address } from '../../entities/Address.entity';
import FormStep from '../../enums/FormStep';

export default {
  props: ['currentStep'],
  components: {},
  data: () => ({
    componentStep: FormStep.Address,
    addressFormData: new Address('', '', null, '', '', '')
  }),
  methods: {
    prevStep() {
      this.$emit('prev');
    },
    nextStep() {
      this.$emit('next', this.addressFormData);
    }
  },
  emits: ['prev', 'next'],
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
  