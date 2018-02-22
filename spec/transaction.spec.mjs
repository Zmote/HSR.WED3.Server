import config from '../config';
import userService from '../services/userService';
import accountService from '../services/accountService';

config.db.inMemory = true;

describe("Register", function() {

  it("register should return true", async () => {
    let user = await userService.register("mgfeller", "Michael", "Gfeller", "1234");
    expect(user).not.toBeNull();
  });

  it("second register should return false", async () => {
    let user = await userService.register("mgfeller", "Michael", "Gfeller", "1234");
    expect(user).toBeNull();
  });
});



describe("Transactions", function() {
  it("1000 amount after register", async () => {
    let accountA = await accountService.get("1000001");
    expect(account.amount).toBe(1000);

    let accountB = await accountService.get("1000002");
    expect(result.amount).toBe(1000);
  });

  it("transaction above limit", async () => {
    await accountService.addTransaction("1000001", "1000002", 1500, null);
    expect((await accountService.get("1000001")).amount).toBe(1000);
    expect((await accountService.get("1000002")).amount).toBe(1000);
  });

  it("transaction wrong target", async () => {
    await accountService.addTransaction("1000001", "XXXXXXXX", 500, null);
    expect((await accountService.get("1000001")).amount).toBe(1000);
  });


  it("transaction wrong from", async () => {
    await accountService.addTransaction("XXXXXXXX", "1000002", 500, null);
    expect((await accountService.get("1000002")).amount).toBe(1000);
  });

  it("transaction of 500", async () => {
    await accountService.addTransaction("1000001", "1000002", 500, null);
    expect((await accountService.get("1000001")).amount).toBe(500);
    expect((await accountService.get("1000002")).amount).toBe(1500);
  });

});