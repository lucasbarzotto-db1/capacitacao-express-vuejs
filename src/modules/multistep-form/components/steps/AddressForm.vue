<template>
  <div v-if="currentStep === componentStep">
    <div class="form-row">
      <div class="form-item">
        <label class="form-label">CEP</label>
        <input class="input" type="text" v-model="addressFormData.cep" placeholder="CEP" @blur="fetchAddress">
      </div>
      <div class="form-item">
        <label class="form-label">Número</label>
        <input class="input" type="text" v-model="addressFormData.number" placeholder="Número">
      </div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label">Rua</label>
        <input class="input" type="text" v-model="addressFormData.street" disabled>
      </div>
      <div class="form-item">
        <label class="form-label">Bairro</label>
        <input class="input" type="text" v-model="addressFormData.neighborhood" disabled>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label">Cidade</label>
        <input class="input" type="text" v-model="addressFormData.city" disabled>
      </div>
      <div class="form-item">
        <label class="form-label">Estado</label>
        <input class="input" type="text" v-model="addressFormData.state" disabled>
      </div>
    </div>
    <div class="buttons">
      <button class="button-previous" @click="prevStep">Voltar</button>
      <button class="button-next" @click="nextStep">Continuar</button>
    </div>
  </div>
</template>
  
<script lang="ts">
import { Address } from '../../entities/Address.entity';
import { UserData } from '../../entities/UserData.entity';
import FormStep from '../../enums/FormStep';
import { ViaCepResponse } from '../../service/domain/ViaCepResponse';
import ViaCepService from '../../service/via-cep.service';

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
    componentStep: FormStep.Address,
    addressFormData: new Address('', '', null, '', '', '')
  }),
  methods: {
    prevStep() {
      this.$emit('prev', this.addressFormData);
    },
    nextStep() {
      this.$emit('next', this.addressFormData);
    },
    async fetchAddress() {
      ViaCepService.getAddressByCep(this.addressFormData.cep).then((response: ViaCepResponse) => {
        this.addressFormData.city = response.data.localidade;
        this.addressFormData.neighborhood = response.data.bairro;
        this.addressFormData.state = response.data.uf;
        this.addressFormData.street = response.data.logradouro;
      }).catch((error) => {
        alert('CEP não encontrado');
        this.addressFormData.city = '';
        this.addressFormData.neighborhood = '';
        this.addressFormData.state = '';
        this.addressFormData.street = '';
        console.log(error);
      });
    },
  },
  mounted() {
    Object.assign(this.addressFormData, this.userData.address);
  },
  emits: ['prev', 'next'],
};
</script>
  
<style scoped>
.form-row {
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
}

.form-item {
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: flex;
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

input:disabled {
  background: #F5F4F6;
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
  