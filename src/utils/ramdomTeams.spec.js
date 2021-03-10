import { randomTeams } from './randomTeams'

const teams = ['Sport', 'Corinthians', 'Juventude', 'Cruzeiro']

describe( 'Random Teams utils' ,()=> {
    it('should generate a random array', () => {
        expect(randomTeams(teams)).not.toBe(teams)
    });

    it('should generate an array with same length', () => {
        expect(randomTeams(teams).length).toBeGreaterThanOrEqual(teams.length)
    });
})