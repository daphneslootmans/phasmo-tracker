<template>
  <div class="tracker">
    <b-container>
      <b-row>
        <b-col>
          <h1>Welcome back</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="auto">
          <b-form-row>
            <b-col>
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
          </b-form-row>
        </b-col>
        <b-col cols="auto">
          <div class="ghost-list">
            <div v-for="(ghost, index) in filteredGhosts"
                 :key="'ghost' + index"
            >
              {{ ghost.name }} {{ ghost.evidence }}
            </div>
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
          ]
        },
        {
          name: 'Demon',
          evidence: [
            'freezing', 'fingerprints', 'writing'
          ]
        },
        {
          name: 'Goryo',
          evidence: [
            'emf', 'fingerprints', 'dots'
          ]
        },
        {
          name: 'Hantu',
          evidence: [
            'orb', 'fingerprints', 'freezing'
          ]
        },
        {
          name: 'Jinn',
          evidence: [
            'emf', 'fingerprints', 'freezing'
          ]
        },
        {
          name: 'Mare',
          evidence: [
            'orb', 'box', 'writing'
          ]
        },
        {
          name: 'Myling',
          evidence: [
            'emf', 'fingerprints', 'writing'
          ]
        },
        {
          name: 'Oni',
          evidence: [
            'emf', 'freezing', 'dots'
          ]
        },
        {
          name: 'Phantom',
          evidence: [
            'box', 'fingerprints', 'dots'
          ]
        },
        {
          name: 'Poltergeist',
          evidence: [
            'box', 'fingerprints', 'writing'
          ]
        },
        {
          name: 'Revenant',
          evidence: [
            'orb', 'freezing', 'writing'
          ]
        },
        {
          name: 'Shade',
          evidence: [
            'emf', 'freezing', 'writing'
          ]
        },
        {
          name: 'Spirit',
          evidence: [
            'emf', 'box', 'writing'
          ]
        },
        {
          name: 'Wraith',
          evidence: [
            'emf', 'box', 'dots'
          ]
        },
        {
          name: 'Yokai',
          evidence: [
            'orb', 'box', 'dots'
          ]
        },
        {
          name: 'Yurei',
          evidence: [
            'orb', 'freezing', 'dots'
          ]
        }
      ],
      selectedEvidence: [],
      disabledEvidence: []
    }
  },
  computed: {
    filteredGhosts () {
      let ghosts = []
      if (this.selectedEvidence.length > 0) {
        this.ghostTypes.forEach(ghost => {
          let possible = this.selectedEvidence.every(type => {
            return ghost.evidence.includes(type)
          })
          if (possible && !this.isDisabled(ghost)) ghosts.push(ghost)
        })
        return ghosts
      } else if (this.disabledEvidence.length > 0) {
        this.ghostTypes.forEach(ghost => {
          if (!this.isDisabled(ghost)) ghosts.push(ghost)
        })
        return ghosts
      } else return this.ghostTypes
    },
    possibleEvidence () {
      let evidence = []
      this.filteredGhosts.forEach(ghost => {
        ghost.evidence.forEach(type => {
          if (!evidence.includes(type)) evidence.push(type)
        })
      })
      return evidence
    }
  },
  methods: {
    isDisabled (ghost) {
      let disabled = false
      if (this.disabledEvidence.length > 0) {
        disabled = this.disabledEvidence.some(type => {
          return ghost.evidence.includes(type)
        })
      }
      return disabled
    }
  }
}
</script>

<style scoped lang="scss">

</style>
