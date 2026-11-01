# Before this goes live

## Confirm with the owner

| Item | What's on the site now | Why it needs checking |
|---|---|---|
| Phone and WhatsApp | +254 709 255 006 | Listings also show +254 715 255 007 and +254 719 255 005 |
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

The logo on the site is a stand-in wordmark. Ask for the real logo file; the resort's sign shows a tree-and-droplet mark.

## Before launch

The domain havilaresort.com is the owner's. It did not resolve from my test machine, so check who controls it and whether the existing site is really down. Then build with `PUBLIC=1` as in `README.md`.
