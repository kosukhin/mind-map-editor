<script lang="ts" setup>
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseCheckbox from '@/components/BaseCheckbox/BaseCheckbox.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';

const parentTypes: string[] = [];
const form: any = {};
</script>

<template>
  <BaseModal name="settings">
    <template #header>
      <h2 class="text-lg font-bold">{{ $t('general.mapSettings') }}</h2>
    </template>
    <div class="TheSettings">
      <div class="mb-2">
        <a href="#" class="PageEditor-Download">
          Скачать карту
        </a>
        <div class="TheSettings-Row">
          <div class="flex gap-2 mb-2">
            <BaseButton
              class="text-white"
              type="primary"
            >
              {{ $t('general.jsonExportImport') }}
            </BaseButton>
            <BaseButton
              class="text-white"
              type="primary"
            >
              {{ $t('general.keybindings') }}
            </BaseButton>
            <BaseButton
              v-if="parentTypes.length"
              type="primary"
              class="text-white"
            >
              {{ $t('general.parentTypes') }}
            </BaseButton>
            <BaseButton
              type="primary"
              class="text-white e2e-open-presets"
            >
              Пресеты
            </BaseButton>
          </div>
        </div>
        <div class="TheSettings-Row">
          <BaseCheckbox
            v-model="form.colored"
            :label="$t('general.useLabelsColoring')"
          />
        </div>
        <div class="mb-2">
          <BaseCheckbox
            v-model="form.skipSearchIndex"
            label="Пропустить индексацию поиском"
          />
        </div>
        <div class="mb-2">
          <label>
            <b>{{ $t('general.mapName') }}</b>
            <BaseInput v-model="form.title" />
          </label>
        </div>
        <div class="mb-2">
          <a href="https://github.com/kosukhin/mind-map-creator" target="_blank">
            {{ $t('general.githubRepo') }}
          </a>
        </div>
        <div class="mb-4">
          <b>{{ $t('general.favorites') }}</b>
          <BaseInput v-model="form.favoriteGroup" />
        </div>
      </div>
      <div class="flex gap-2">
        <BaseButton class="TheSettings-Button" type="success">
          {{ $t('general.save') }}
        </BaseButton>
        <BaseButton class="TheSettings-Button">
          {{ $t('general.cancel') }}
        </BaseButton>
        <BaseButton class="TheSettings-Button" type="danger">
          {{ $t('general.removeMap') }}
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>
