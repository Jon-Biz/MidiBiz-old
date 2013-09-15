describe("MainCtrl", function() {

	beforeEach(function() {
		browser().navigateTo('/');
		sleep(3);

	});

	it("should display inputs and outputs divs", function() {
	  expect(element("#outputs").count()).toEqual(1);
	  expect(element("#inputs").count()).toEqual(1);

	});
  
  	it('should display as many input labels as the are in MIDIAccess.enumerateInputs()',function () {
  		expect(element(".midiinputlabel").count()).toEqual(9);
  	})
});