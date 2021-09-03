<template>
  <div class="tracker">
    <b-container>
      <b-row align-h="between" align-v="center" class="mb-2">
        <b-col cols="auto">
          <h3 class="mb-0">Phasmophobia<br>Evidence Tracker</h3>
        </b-col>
        <b-col cols="auto">
          <b-button variant="outline-dark" @click="clearAll">Clear</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="auto">
          <b-row no-gutters>
            <b-col>
              <font-awesome-icon icon="ban" class="text-danger icon-small"></font-awesome-icon>
              <b-form-checkbox-group id="evidence-disabled-group"
                                     v-model="disabledEvidence"
                                     name="disabledEvidence"
                                     stacked
              >
                <b-form-checkbox
                    value="dots"
                    :disabled="selectedEvidence.includes('dots')"
                >
                </b-form-checkbox>
                <b-form-checkbox
                    value="emf"
                    :disabled="selectedEvidence.includes('emf')"
                >
                </b-form-checkbox>
                <b-form-checkbox
                    value="fingerprints"
                    :disabled="selectedEvidence.includes('fingerprints')"
                >
                </b-form-checkbox>
                <b-form-checkbox
                    value="freezing"
                    :disabled="selectedEvidence.includes('freezing')"
                >
                </b-form-checkbox>
                <b-form-checkbox
                    value="orb"
                    :disabled="selectedEvidence.includes('orb')"
                >
                </b-form-checkbox>
                <b-form-checkbox
                    value="writing"
                    :disabled="selectedEvidence.includes('writing')"
                >
                </b-form-checkbox>
                <b-form-checkbox
                    value="box"
                    :disabled="selectedEvidence.includes('box')"
                >
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-col>
            <b-col>
              <font-awesome-icon icon="check-circle" class="text-success icon-small"></font-awesome-icon>
              <b-form-checkbox-group id="evidence-group"
                                     v-model="selectedEvidence"
                                     name="evidence"
                                     stacked
              >
                <b-form-checkbox
                    value="dots"
                    :disabled="disabledEvidence.includes('dots') || selectedEvidence.includes('writing') || (selectedEvidence.length === 3 && !selectedEvidence.includes('dots')) || !possibleEvidence.includes('dots')"
                >
                  D.O.T.S.
                </b-form-checkbox>
                <b-form-checkbox
                    value="emf"
                    :disabled="disabledEvidence.includes('emf') || selectedEvidence.includes('orb') || (selectedEvidence.length === 3 && !selectedEvidence.includes('emf')) || !possibleEvidence.includes('emf')"
                >
                  EMF 5
                </b-form-checkbox>
                <b-form-checkbox
                    value="fingerprints"
                    :disabled="disabledEvidence.includes('fingerprints') || selectedEvidence.length === 3 && !selectedEvidence.includes('fingerprints') || !possibleEvidence.includes('fingerprints')"
                >
                  Fingerprints
                </b-form-checkbox>
                <b-form-checkbox
                    value="freezing"
                    :disabled=" disabledEvidence.includes('freezing') ||selectedEvidence.includes('box') || (selectedEvidence.length === 3 && !selectedEvidence.includes('freezing')) || !possibleEvidence.includes('freezing')"
                >
                  Freezing
                </b-form-checkbox>
                <b-form-checkbox
                    value="orb"
                    :disabled="disabledEvidence.includes('orb') || selectedEvidence.includes('emf') || (selectedEvidence.length === 3 && !selectedEvidence.includes('orb')) || !possibleEvidence.includes('orb')"
                >
                  Ghost Orb
                </b-form-checkbox>
                <b-form-checkbox
                    value="writing"
                    :disabled="selectedEvidence.includes('dots') || (selectedEvidence.length === 3 && !selectedEvidence.includes('writing')) || !possibleEvidence.includes('writing')"
                >
                  Writing
                </b-form-checkbox>
                <b-form-checkbox
                    value="box"
                    :disabled="disabledEvidence.includes('box') || selectedEvidence.includes('freezing') || (selectedEvidence.length === 3 && !selectedEvidence.includes('box')) || !possibleEvidence.includes('box')"
                >
                  Spirit Box
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <div class="ghost-list">
            <transition-group name="slide-up"
                              tag="div"
                              appear
            >
              <div v-for="(ghost, index) in ghostTypes" v-if="ghost.visible"
                   :key="'ghost' + index"
                   class="ghost-list__item"
              >
                <b-row @click="toggleGhost(index)" align-h="between" align-v="center">
                  <b-col cols="auto">
                    <div class="title">{{ ghost.name }}</div>
                  </b-col>
                  <b-col cols="auto">
                    <font-awesome-icon icon="angle-down" v-if="ghost.open"></font-awesome-icon>
                    <font-awesome-icon icon="angle-right" v-else></font-awesome-icon>
                  </b-col>
                </b-row>
                <b-collapse :id="'toggle-' + index" v-model="ghost.open">
                  <div class="evidence-list">
                  <span :class="['evidence-list__item', {selected: selectedEvidence.includes(type)}]"
                        v-for="type in ghost.evidence"
                        :key="type + index"
                  >{{ evidenceTypes[type].text }}</span>
                  </div>
                  <div>{{ ghost.info }}</div>
                </b-collapse>
              </div>
            </transition-group>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'tracker',
  data () {
    return {
      ghostTypes: [
        {
          name: 'Banshee',
          evidence: [
            'orb', 'fingerprints', 'dots'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Demon',
          evidence: [
            'freezing', 'fingerprints', 'writing'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Goryo',
          evidence: [
            'emf', 'fingerprints', 'dots'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Hantu',
          evidence: [
            'orb', 'freezing', 'fingerprints',
          ],
          open: true,
          visible: true
        },
        {
          name: 'Jinn',
          evidence: [
            'emf', 'freezing', 'fingerprints'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Mare',
          evidence: [
            'orb', 'box', 'writing'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Myling',
          evidence: [
            'emf', 'fingerprints', 'writing'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Oni',
          evidence: [
            'emf', 'freezing', 'dots'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Phantom',
          evidence: [
            'box', 'fingerprints', 'dots'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Poltergeist',
          evidence: [
            'box', 'fingerprints', 'writing'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Revenant',
          evidence: [
            'orb', 'freezing', 'writing'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Shade',
          evidence: [
            'emf', 'freezing', 'writing'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Spirit',
          evidence: [
            'emf', 'box', 'writing'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Wraith',
          evidence: [
            'emf', 'box', 'dots'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Yokai',
          evidence: [
            'orb', 'box', 'dots'
          ],
          open: true,
          visible: true
        },
        {
          name: 'Yurei',
          evidence: [
            'orb', 'freezing', 'dots'
          ],
          open: true,
          visible: true
        }
      ],
      evidenceTypes: {
        'orb': {
          text: 'Ghost Orb'
        },
        'fingerprints': {
          text: 'Fingerprints'
        },
        'emf': {
          text: 'EMF 5'
        },
        'freezing': {
          text: 'Freezing'
        },
        'dots': {
          text: 'D.O.T.S.'
        },
        'writing': {
          text: 'Writing'
        },
        'box': {
          text: 'Spirit Box'
        },
      },
      selectedEvidence: [],
      disabledEvidence: []
    }
  },
  computed: {
    possibleEvidence () {
      let evidence = []
      this.ghostTypes.forEach(ghost => {
        if (ghost.visible) {
          ghost.evidence.forEach(type => {
            if (!evidence.includes(type)) evidence.push(type)
          })
        }
      })
      return evidence
    }
  },
  methods: {
    filterGhosts () {
      if (this.selectedEvidence.length > 0) {
        this.ghostTypes.forEach(ghost => {
          let possible = this.selectedEvidence.every(type => {
            return ghost.evidence.includes(type)
          })
          if (possible && !this.isDisabled(ghost)) this.$set(ghost, 'visible', true)
          else this.$set(ghost, 'visible', false)
        })
      } else if (this.disabledEvidence.length > 0) {
        this.ghostTypes.forEach(ghost => {
          if (!this.isDisabled(ghost)) this.$set(ghost, 'visible', true)
          else this.$set(ghost, 'visible', false)
        })
      } else {
        this.ghostTypes.forEach(ghost => {
          this.$set(ghost, 'visible', true)
        })
      }
    },
    isDisabled (ghost) {
      let disabled = false
      if (this.disabledEvidence.length > 0) {
        disabled = this.disabledEvidence.some(type => {
          return ghost.evidence.includes(type)
        })
      }
      return disabled
    },
    toggleGhost (index) {
      this.ghostTypes[index].open = !this.ghostTypes[index].open
    },
    clearAll () {
      this.selectedEvidence = []
      this.disabledEvidence = []
    }
  },
  watch: {
    selectedEvidence () {
      this.filterGhosts()
    },
    disabledEvidence () {
      this.filterGhosts()
    }
  }
}
</script>

<style scoped lang="scss">
$checked-color: #C9F4A5;

.icon-small {
  font-size: 16px;
}

.ghost-list {
  display: flex;
  flex-flow: column nowrap;

  &__item {
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #d6d6d6;
    transition: all 400ms;
  }

  .title {
    font-weight: 600;
  }
}

.evidence-list {
  display: flex;
  flex-flow: row wrap;

  &__item {
    font-size: 14px;
    padding: 0 4px;
    //border: 1px solid transparent;

    &:not(:last-child) {
      margin-right: 5px;
    }

    &.selected {
      border-color: $checked-color;
      background: rgba($checked-color, 0.5);
    }
  }
}

.collapsed > .hide-closed,
.not-collapsed > .hide-open {
  display: none;
}
</style>
