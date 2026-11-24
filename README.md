# CvSU Mini Store

DCIT26 — Laboratory Exercise 4: React useState and useEffect (Live Search and Filter)

## Guide questions — Laboratory Exercise 4

**1. Why do we use two separate states, searchText and debouncedSearch, instead of only one?**

`searchText` changes immediately so the input always shows what the user types. `debouncedSearch` changes only after a 300 ms pause, so filtering does not need to run with each new keyword while the user is typing. The component can still render for other state changes.

**2. What would happen if the debounce effect did not return a cleanup function?**

Old timers would keep running even when the user types another character. They could apply intermediate search values and cause unnecessary updates. The cleanup cancels the previous timer when the keyword changes or the component unmounts.

**3. What is the purpose of the dependency array? What happens if it is empty ([])? What happens if it is left out completely?**

The dependency array tells React which values should trigger an effect again. An empty array runs the effect after mounting, with an additional setup/cleanup check in development Strict Mode. Without an array, the effect runs after every committed render.

**4. Why should we avoid sorting the original products array directly?**

JavaScript's `.sort()` changes the array it is called on. Sorting the original array would change the default product order and could affect other components that use the same data. Sorting a copy keeps the original list unchanged.

**5. Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.**

It is better to calculate it during rendering because it already depends on the products, debounced keyword, category, and sort order. Storing the same derived information in another state could make the displayed products inconsistent with the filters.
