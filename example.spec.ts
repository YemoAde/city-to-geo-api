describe('Example - My First test Suite', () => {
    it('simple addition', () => {
        expect(2 + 2).toEqual(4)
    })

    it('simple addition', () => {
        expect(2 + 3).not.toEqual(4)
    })
})