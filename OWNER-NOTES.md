# Before this goes live

## Confirm with the owner

| Item | What's on the site now | Why it needs checking |
|---|---|---|
| Phone and WhatsApp | +254 715 255 007 | Taken from the resort's own website and Facebook. Google shows +254 709 255 006 and a booking listing +254 719 255 005. Confirm this number is on WhatsApp, and correct the Google listing |
| Ten acres | Home page | From the resort's own website. Another source says 40 |
| Guest quotes | Three named quotes on the home page | Copied from the resort's own website, with the emoji removed. Check the guests are happy to appear |
| Hiking price | KES 1,000 for Hiking and skywalk | Listing price. Check it covers the skywalk |
| Package prices | Team building KES 3,250, Conference KES 3,000, 6-hour hike KES 2,500 | From the resort's packages page, captured November 2025. Check they still apply in 2026, and any minimum group size |
| Apiculture and aquaculture training | "Ask us" | From the resort's website (capture of January 2026). Confirm they still run and get prices |
| Barizi menu | Full menu and prices on the Barizi page | Typed from the resort's food menu, which has no date or currency, so KES is assumed. Check it's current. Query: Havila Kienyeji Chicken and Kienyeji Chicken ½ are both 1,000, and "Pousin chips" and "Ndubia" are spelled as printed |
| Rate PDFs | Not on hand | Ask for the activity and package rates PDFs. They may replace the operator's prices |
| All prices | 2026 rates | Taken from a tour operator's listing (African Spice Safaris), not from the resort |
| Non-resident Standard B&B | US$70 for one or two guests | Same price for both looks odd |
| Non-resident mini rafting under 4 guests | "Quoted on request" | The listing says US$500, likely a typo |
| Kayak, quad, fishing, yoga, pottery, nature trail | "Ask us" | No current price found |
| Google rating | 4.3 | Read October 2026, about 939 reviews. Re-check before launch |
| Meal plans | Half Board adds one main meal, Full Board adds lunch and dinner | Standard meaning, not confirmed by the resort |
| Campfires and grilling | Mentioned on the home and camping pages | Assumed allowed |
| Weddings | Rose petals, photos on the bridge and at the falls | Inferred from a room photo and listings |
| Boat rides "around the islands", pack list, weekend itinerary | Written for this site | Suggested copy for the owner to approve |
| Late arrival, payment and pet rules | As shown on booking listings | Check they're current. M-Pesa is unconfirmed |
| Accessibility | Falls, bridge and camping area are hard to reach | From one guest review. The owner may want to reword it |
| Barizi "not staying? come anyway" | Invites walk-in diners | Check the restaurant accepts them |

The conference capacity is deliberately left out because no figure was available.

## Photos

**Real Havila photos (15).** Downloaded from the resort's Expedia-group listing at web resolution. Ask the owner for the originals, and for confirmation that the site may use them.

**Sample photos, tagged on the site.** Most of the imagery on the home, Stay, Barizi and Events pages is now high-quality stock from other places, including the hero waterfall, room photos, food and weddings. Every one must be replaced with real Havila photos before launch, and the owner should be told they are placeholders. Files are in `src/photos-raw/sample/`: keep the same file name when replacing, and the site picks it up on rebuild. Licences are listed in `src/data.mjs` and on `/credits/`.

**Most wanted from a shoot:** Kirengete Falls (no photo on the site yet), the islands, Havila's own rafts and quads, the campsite, and the view from Barizi.

The logo on the site is a stand-in wordmark. Ask for the real logo file; the sign and the food menu show the tree-and-droplet mark. The menu's food photos look like stock cut-outs, so they aren't used.

## Before launch

The domain havilaresort.com is the owner's. It did not resolve from my test machine, so check who controls it and whether the existing site is really down. The Wayback Machine has captures up to 15 February 2026. Then build with `PUBLIC=1` as in `README.md`.

The resort's website also links to Instagram and YouTube. Ask for those addresses so they can go in the footer beside Facebook.
