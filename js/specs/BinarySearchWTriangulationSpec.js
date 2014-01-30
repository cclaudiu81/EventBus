/**
 * Binary Search Example in JS using Jasmine
 *
 * Note: the Container should not be mandatory ordered prior binarySearch() operation
 *
 * The algorithm compares the searched element with the middle element contained in that array
 *      --> if the search key matches --> found the element on that position
 *      --> if the search key is less than the middle element? then the algorithm repeats the action
 *          on the sub-array, to the left of the middle element, or if the element is higher than
 *          the middle element to the right.
 *      --> if the element is not found then a NOT_FOUND is returned.
 *
 * Triangulation: start by a success test, returning a "DUPLICATED CONSTANT", we don't have any insight yet of the
 * algorithm...(or at least we should pretend like)
 * Since the first test is GREEN, use the second point of the Triangulation process to define the second
 * specification. While doing this we gain insight of the domain-problem. ALSO writing the second specification,
 * we are not able to make it green until we modify the real implementation which makes the first spec pass
 * by returning a constant.
 * Armed with this insight we start by providing the third point of the process, by providing real production
 * implementation.
 *
 * @author cclaudiu on 1/16/14.
 */
define(["CoreSpecLibs"], function () {

    /* Actual Implementation -- Production Code */
    Array.prototype.binarySearch = function (element) {
        var middleElementIdx;

        if (this.length === 1) {
            var isContained = (element === this[0]);
            return isContained ? 0 : undefined;
        }

        if (this.length > 1) {
            middleElementIdx = Math.round(this.length / 2);
            if (element === this[middleElementIdx]) {
                return middleElementIdx;
            }

            if (element < this[middleElementIdx]) {
                return this.slice(0, middleElementIdx).binarySearch(element);
            } else {
                return this.slice(middleElementIdx).binarySearch(element);
            }
        }

        return undefined;
    };

    /* first point of the triangulation: success specification */
    describe("BinarySearch", function () {
        it("should find the matching token on first element of container", function () {
            var indexPosition = [2].binarySearch(2);

            expect(indexPosition).toBe(0);
        });

        /*
         * second point of the triangulation: failing test! (Nested describe block depending on the Fixture)
         * Implementing the second specification will FORCE us to provide a real implementation, that
         * should stay for the third point of the triangulation
         */
        describe("#binarySearch() applied on container having EVEN size", function () {
            var container;

            beforeEach(function () {
                container = [1, 2, 3, 4];
            });

            afterEach(function () {
                container = undefined;
            });

            it("should return undefined for a missing element", function () {
                expect(container.binarySearch(5)).toBeFalsy();
            });

            it("should return the index position of an element found in the container", function () {
                expect(container.binarySearch(3)).toBe(2);
            });
        });

        /* Grouping specs by FIXTURE, having the same execution context */
        describe("#binarySearch() applied on a container having ODD size", function () {
            var container;

            beforeEach(function () {
                container = [1, 2, 3];
            });

            it("should return the index position of an element found in the container", function () {
                expect(container.binarySearch(2)).toBe(1);
            });

            it("should return undefined for an element not contained in the container", function () {
                expect(container.binarySearch(5)).toBeFalsy();
            });
        });

        describe("#binarySearch applied on an UNSORT container", function() {
            var container;
            beforeEach(function() {
                container = [9, 8, 6, 10];
            });

            it("should find the element contained in the container", function() {
                expect(container.binarySearch(6)).toBe(2);
            })

            it("should return undefined for an element not contained in the container", function() {
                expect(container.binarySearch(12)).toBeUndefined();
            });
        });
    });
});
